import fs from "fs";

export class LoggerService {
  private static readonly ERROR_LOG_PATH = "logs/error.log";

  /**
   * Écrit un message dans un fichier de log (crée le dossier et le fichier si nécessaire)
   */
  private static writeLogs(filePath: string, logMessage: string): void {
    const line = `${new Date().toISOString()} - ${logMessage}\n`;
    const folderPath = filePath.substring(0, filePath.lastIndexOf("/"));
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.appendFileSync(filePath, line);
  }

  private static log(message: string, level: string): void {
    console.log(`${new Date().toISOString()} [${level}] ${message}`);
  }

  static info(message: string): void {
    this.log(message, "INFO");
  }

  static debug(message: string): void {
    this.log(message, "DEBUG");
  }

  static error(error: unknown): void {
    if (error instanceof Error) {
      this.log(error.message, "ERROR");
      LoggerService.writeLogs(LoggerService.ERROR_LOG_PATH, error.message);
    } else if (typeof error === "string") {
      this.log(error, "ERROR");
      LoggerService.writeLogs(LoggerService.ERROR_LOG_PATH, error);
    }
  }
}
