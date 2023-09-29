/*
  Warnings:

  - Made the column `seatType` on table `Seat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Seat` MODIFY `seatType` ENUM('NORMAL', 'HONEYMOON', 'FIRSTCLASS', 'IMAX', 'FOURDX') NOT NULL DEFAULT 'NORMAL';
