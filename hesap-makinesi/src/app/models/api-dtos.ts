export interface CalculateRequestDto {
  parameter1: number;
  parameter2: number;
}

export interface ResultDto {
  result: number;
}

export interface HistoryEntity {
  id: string;
  operation: string;
  parameter1: number;
  parameter2: number;
  result: number;
  date: string; 
}