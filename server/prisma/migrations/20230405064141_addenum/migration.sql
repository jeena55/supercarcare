-- DropForeignKey
ALTER TABLE `MovieSchedule` DROP FOREIGN KEY `MovieSchedule_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieSchedule` DROP FOREIGN KEY `MovieSchedule_theatreId_fkey`;

-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_theatreId_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `MovieSchedule` ADD CONSTRAINT `MovieSchedule_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieSchedule` ADD CONSTRAINT `MovieSchedule_theatreId_fkey` FOREIGN KEY (`theatreId`) REFERENCES `Theatre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_theatreId_fkey` FOREIGN KEY (`theatreId`) REFERENCES `Theatre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
