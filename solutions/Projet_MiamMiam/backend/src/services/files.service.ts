import fs from "fs";

/**
 * "Base de données" : chaque ressource est stockée dans un fichier JSON
 * contenant un tableau d'objets (data/users.json, data/recipes.json, ...).
 */
export class FilesService {
  private static createDBIfNotExist(dbPath: string): void {
    const folderPath = dbPath.substring(0, dbPath.lastIndexOf("/"));
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
    }
  }

  /**
   * Lit le tableau d'objets de type T contenu dans le fichier
   * Usage : const data: UserDBO[] = FilesService.readFile<UserDBO>("data/users.json");
   */
  public static readFile<T>(filePath: string): T[] {
    this.createDBIfNotExist(filePath);
    const dataString: string = fs.readFileSync(filePath, "utf-8");
    const data: T[] = JSON.parse(dataString);
    return data;
  }

  /**
   * Remplace le contenu du fichier par le tableau d'objets de type T
   * Usage : FilesService.writeFile<UserDBO>("data/users.json", data);
   */
  public static writeFile<T>(filePath: string, data: T[]): void {
    this.createDBIfNotExist(filePath);
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, dataString, "utf-8");
  }
}
