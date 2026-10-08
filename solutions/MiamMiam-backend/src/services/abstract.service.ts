import { FilesService } from "./files.service";
import { LoggerService } from "./logger.service";

/**
 * Service de base : lecture/écriture du fichier JSON d'une ressource,
 * avec conversion DBO <-> objet métier via un mapper.
 */
export abstract class AbstractService {
  protected static dbPath: string = "";

  protected static readDB<FileT, OutT>(mapper: (item: FileT) => OutT): OutT[] {
    let dbos: FileT[] = [];
    try {
      dbos = FilesService.readFile<FileT>(this.dbPath);
    } catch (error) {
      LoggerService.error(error);
      return [];
    }
    const items: OutT[] = [];
    for (const dbo of dbos) {
      items.push(mapper(dbo));
    }
    return items;
  }

  protected static writeDB<From, ToWrite>(items: From[], mapper: (item: From) => ToWrite): boolean {
    const dbos: ToWrite[] = [];
    for (const item of items) {
      dbos.push(mapper(item));
    }
    try {
      FilesService.writeFile<ToWrite>(this.dbPath, dbos);
    } catch (error) {
      LoggerService.error(error);
      return false;
    }
    return true;
  }

  /** Prochain id disponible (les ids commencent à 1) */
  protected static getNextId(items: { id: number }[]): number {
    let max = 0;
    for (const item of items) {
      if (item.id > max) {
        max = item.id;
      }
    }
    return max + 1;
  }
}
