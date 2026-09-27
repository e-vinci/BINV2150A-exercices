/**
 * Modèles de base partagés par toutes les ressources.
 *
 * Convention (identique au projet Web 1) :
 *  - XxxDBO : forme stockée dans le fichier JSON (snake_case, dates en string ISO)
 *  - Xxx    : forme utilisée dans le code métier (camelCase, dates en Date)
 *  - XxxDTO : forme échangée avec le client via l'API (camelCase, dates en string ISO)
 */

export interface BasicModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BasicModelDBO {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface BasicModelDTO {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}
