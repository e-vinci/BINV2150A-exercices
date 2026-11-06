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
    /*************************************/
    /*       Solution Seance 01          */
    /*************************************/
    return dbos.map((d) => mapper(d));
  }

  protected static writeDB<From, ToWrite>(
    items: From[],
    mapper: (item: From) => ToWrite,
  ): boolean {
    /*************************************/
    /*       Solution Seance 01          */
    /*************************************/
    const dbos: ToWrite[] = items.map((i) => mapper(i));
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
    /*************************************/
    /*       Solution Seance 01          */
    /*************************************/
    return items.reduce((max, item) => Math.max(max, item.id), 1);
  }
}
