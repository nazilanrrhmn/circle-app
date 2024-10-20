import { Request, Response } from "express";
import UserServices from "../services/user.services";
import { createUserSchema } from "../utils/schemas/user.schema";
import userServices from "../services/user.services";
import cloudinaryServices from "../services/cloudinary.services";

class UserController {
  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find all users'
    try {
      const userId = (req as any).user.id;
      const users = await UserServices.getAllUsers(userId);
      res.json(users);
    } catch (error: unknown) {
      res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Find a user by params id'
    try {
      const userId = req.params.id;
      const userLoginId = (req as any).user.id;
      const user = await userServices.getUserById(Number(userId));
      const isFollow = await userServices.isFollow(Number(userId), userLoginId);
      res.json({ ...user, isFollow });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // async update(req: Request, res: Response) {
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'Update existing user'
  //   /*  #swagger.requestBody = {
  //           required: true,
  //           content: {
  //               "multipart/form-data": {
  //                   schema: {
  //                       $ref: "#/components/schemas/profileEditSchema"
  //                   }
  //               }
  //           }
  //       }
  //   */
  //   try {
  //     const id = (req as any).user.id;

  //     const files = req.files as {
  //       profilePhoto?: Express.Multer.File[];
  //       coverPhoto?: Express.Multer.File[];
  //     };

  //     let imageUrl = null;
  //     let imageUrlCover = null;

  //     // Handle profile photo upload
  //     if (files.profilePhoto && files.profilePhoto.length > 0) {
  //       const profileImage = await cloudinaryServices.upload(
  //         files.profilePhoto[0]
  //       );
  //       imageUrl = profileImage.secure_url;
  //     }

  //     // Handle cover photo upload
  //     if (files.coverPhoto && files.coverPhoto.length > 0) {
  //       const coverImage = await cloudinaryServices.upload(files.coverPhoto[0]);
  //       imageUrlCover = coverImage.secure_url;
  //     }

  //     const value = {
  //       ...req.body,
  //       profilePhoto: imageUrl,
  //       coverPhoto: imageUrlCover,
  //       id: id,
  //     };

  //     const user = await UserServices.updateUser(value);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

  // async update(req: Request, res: Response) {
  //   try {
  //     const id = (req as any).user.id;
  //     const files = req.files as {
  //       profilePhoto?: Express.Multer.File[];
  //       coverPhoto?: Express.Multer.File[];
  //     };

  //     let imageUrl = null;
  //     let imageUrlCover = null;

  //     // Handle profile photo upload
  //     if (files?.profilePhoto && files.profilePhoto.length > 0) {
  //       const profileImage = await cloudinaryServices.upload(
  //         files.profilePhoto[0]
  //       );
  //       imageUrl = profileImage.secure_url;
  //     }

  //     // Handle cover photo upload
  //     if (files?.coverPhoto && files.coverPhoto.length > 0) {
  //       const coverImage = await cloudinaryServices.upload(files.coverPhoto[0]);
  //       imageUrlCover = coverImage.secure_url;
  //     }

  //     // Merge with the user details from the body
  //     const value = {
  //       ...req.body,
  //       profilePhoto: imageUrl,
  //       coverPhoto: imageUrlCover,
  //       id: id,
  //     };

  //     const user = await UserServices.updateUser(value);
  //     return res.json(user);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }

  // async update(req: Request, res: Response) {
  //   try {
  //     const id = (req as any).user.id; // Ambil ID user dari request
  //     const files = req.files as {
  //       profilePhoto?: Express.Multer.File[];
  //       coverPhoto?: Express.Multer.File[];
  //     };

  //     // Object untuk menyimpan URL gambar yang diunggah
  //     const uploadResults: { profilePhoto?: string; coverPhoto?: string } = {};

  //     // Buat array promise untuk mengunggah foto profil dan foto sampul secara paralel
  //     const uploadPromises: Promise<void>[] = [];

  //     // Unggah foto profil jika ada
  //     if (files?.profilePhoto?.[0]) {
  //       uploadPromises.push(
  //         cloudinaryServices
  //           .upload(files.profilePhoto[0])
  //           .then((profileImage) => {
  //             uploadResults.profilePhoto = profileImage.secure_url;
  //           })
  //       );
  //     }

  //     // Unggah foto sampul jika ada
  //     if (files?.coverPhoto?.[0]) {
  //       uploadPromises.push(
  //         cloudinaryServices.upload(files.coverPhoto[0]).then((coverImage) => {
  //           uploadResults.coverPhoto = coverImage.secure_url;
  //         })
  //       );
  //     }

  //     // Tunggu semua proses upload selesai
  //     await Promise.all(uploadPromises);

  //     // Buat objek data user dengan menggabungkan data request body dan hasil upload
  //     const value = {
  //       ...req.body, // Menggabungkan semua field dari req.body
  //       ...uploadResults, // Menambahkan URL gambar yang diunggah
  //       id: id, // Menambahkan user ID
  //     };

  //     // Perbarui data pengguna di database
  //     const user = await UserServices.updateUser(value);
  //     return res.json(user);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }

  // New
  async update(req: Request, res: Response) {
    try {
      const id = (req as any).user.id; // Ambil ID user dari request
      const files = req.files as {
        profilePhoto?: Express.Multer.File[];
        coverPhoto?: Express.Multer.File[];
      };

      // Object untuk menyimpan URL gambar yang diunggah
      const uploadResults: { profilePhoto?: string; coverPhoto?: string } = {};

      // Fungsi untuk upload gambar
      const uploadFile = async (
        file: Express.Multer.File,
        type: "profilePhoto" | "coverPhoto"
      ) => {
        try {
          const result = await cloudinaryServices.upload(file);
          uploadResults[type] = result.secure_url;
        } catch (error) {
          throw new Error(`Failed to upload ${type}`);
        }
      };

      // Buat array promise untuk mengunggah foto profil dan foto sampul secara paralel
      const uploadPromises: Promise<void>[] = [];

      // Unggah foto profil jika ada
      if (files?.profilePhoto?.[0]) {
        uploadPromises.push(uploadFile(files.profilePhoto[0], "profilePhoto"));
      }

      // Unggah foto sampul jika ada
      if (files?.coverPhoto?.[0]) {
        uploadPromises.push(uploadFile(files.coverPhoto[0], "coverPhoto"));
      }

      // Tunggu semua proses upload selesai
      await Promise.all(uploadPromises);

      // Buat objek data user dengan menggabungkan data request body dan hasil upload
      const value = {
        ...req.body, // Menggabungkan semua field dari req.body
        ...uploadResults, // Menambahkan URL gambar yang diunggah
        id: id, // Menambahkan user ID
      };

      // Perbarui data pengguna di database
      const user = await UserServices.updateUser(value);

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
