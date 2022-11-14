import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import {
  CREATED_USER_SUCCES_MESSAGE,
  DELETED_USER_SUCCES_MESSAGE,
  FIND_ALL_USER_SUCCES_MESSAGE,
  FIND_ONE_USER_SUCCES_MESSAGE,
  UPDATED_USER_SUCCES_MESSAGE,
} from '@/messages/errors';

import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

import { uploadFile, getFileStream } from '@utils/s3';

class UsersController {
  public userService = new userService();

  public getThumbnail = async (req: Request, res: Response) => {
    const readStream = getFileStream(req.params.key);
    readStream.pipe(res);
  };

  public uploadThumbnail = async (req: Request, res: Response) => {
    const file = req.file;
    // apply filter
    // resize
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    const description = req.body.description;
    res.send({ imagePath: `/images/${result.Key}` });
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: FIND_ALL_USER_SUCCES_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: FIND_ONE_USER_SUCCES_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: CREATED_USER_SUCCES_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: UPDATED_USER_SUCCES_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: DELETED_USER_SUCCES_MESSAGE });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
