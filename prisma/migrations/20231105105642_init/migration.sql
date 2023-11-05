/*
  Warnings:

  - Added the required column `departure_time` to the `journey_station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `journey_station` ADD COLUMN `departure_time` DATETIME(3) NOT NULL;
