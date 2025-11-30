import os
import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
if not TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN not set in environment")

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start_handler(message: types.Message):
    await message.reply(
        "Привет! Я AI Project Manager\n"
        "Команды:\n"
        "/status - Статус проектов\n"
        "/help - Помощь"
    )

@dp.message(Command("status"))
async def status_handler(message: types.Message):
    await message.reply("Статус проектов: Все системы работают нормально")

@dp.message(Command("help"))
async def help_handler(message: types.Message):
    await message.reply("Доступные команды:\n/start - Начало\n/status - Статус")

@dp.message()
async def echo_handler(message: types.Message):
    await message.reply(f"Вы написали: {message.text}")

async def main():
    logger.info("Starting Telegram Bot")
    try:
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    except Exception as e:
        logger.error(f"Bot error: {e}")
        raise
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        raise
