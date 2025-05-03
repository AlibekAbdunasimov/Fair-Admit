import logging
import os
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import (
    Application, CommandHandler, MessageHandler, filters,
    ContextTypes, ConversationHandler
)

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Define conversation states
NAME, AGE, PHOTO = range(3)

# Command handlers
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    await update.message.reply_html(
        f"Hi {user.mention_html()}! I'm your Telegram bot. Use /help to see what I can do."
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text(
        "Here are the available commands:\n"
        "/start - Start the bot\n"
        "/help - Show this help message\n"
        "/survey - Start a simple survey\n"
        "/cancel - Cancel the current operation"
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle regular messages."""
    text = update.message.text
    await update.message.reply_text(f"You said: {text}\nI'm a simple bot, but I'm listening!")

# Survey conversation handlers
async def start_survey(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Start the survey and ask for name."""
    await update.message.reply_text(
        "I'll ask you a few questions. You can cancel anytime with /cancel.\n\n"
        "What's your name?"
    )
    return NAME

async def get_name(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Store the name and ask for age."""
    context.user_data["name"] = update.message.text
    await update.message.reply_text(
        f"Nice to meet you, {context.user_data['name']}!\n\n"
        "How old are you?"
    )
    return AGE

async def get_age(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Store the age and ask for a photo."""
    try:
        age = int(update.message.text)
        context.user_data["age"] = age
        
        reply_keyboard = [["Skip"]]
        await update.message.reply_text(
            "Would you like to send me a photo? Or press 'Skip'.",
            reply_markup=ReplyKeyboardMarkup(
                reply_keyboard, one_time_keyboard=True, input_field_placeholder="Send photo or skip"
            ),
        )
        return PHOTO
    except ValueError:
        await update.message.reply_text("Please enter a valid number for your age.")
        return AGE

async def get_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Store the photo and end conversation."""
    user_data = context.user_data
    if update.message.text == "Skip":
        await update.message.reply_text(
            f"Survey completed! Here's what I know about you:\n"
            f"Name: {user_data['name']}\n"
            f"Age: {user_data['age']}\n"
            f"No photo provided.",
            reply_markup=ReplyKeyboardRemove(),
        )
    else:
        photo_file = await update.message.photo[-1].get_file()
        await photo_file.download_to_drive(f"user_photo_{update.effective_user.id}.jpg")
        await update.message.reply_text(
            f"Survey completed! Here's what I know about you:\n"
            f"Name: {user_data['name']}\n"
            f"Age: {user_data['age']}\n"
            f"Photo received!",
            reply_markup=ReplyKeyboardRemove(),
        )
    
    user_data.clear()
    return ConversationHandler.END

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancel and end the conversation."""
    await update.message.reply_text(
        "Survey cancelled. Have a nice day!", 
        reply_markup=ReplyKeyboardRemove()
    )
    context.user_data.clear()
    return ConversationHandler.END

def main() -> None:
    """Start the bot."""
    # Create the Application and pass it your bot's token
    application = Application.builder().token("YOUR_TOKEN").build()

    # Add basic command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    
    # Add conversation handler for survey
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("survey", start_survey)],
        states={
            NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
            AGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)],
            PHOTO: [
                MessageHandler(filters.PHOTO, get_photo),
                MessageHandler(filters.Regex("^Skip$"), get_photo),
            ],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )
    application.add_handler(conv_handler)
    
    # Add general message handler
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Run the bot until the user presses Ctrl-C
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
