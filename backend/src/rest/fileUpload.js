import path from 'path';

const MAX_FILE_MB = 5; // 5MB
const FILE_SIZE_LIMIT = MAX_FILE_MB * 1024 * 1024;

/**
 * Middleware that checks if request contains files.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
export const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ status: 'error', message: 'No files was in the body.' });
  }
  next();
};

/**
 * Middleware that checks if uploaded files meet max size criteria.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
export const fileSizeLimiter = (req, res, next) => {
  const files = req.files;
  const filesOverLimit = [];
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length > 0) {
    const sentence = `Upload failed. Files over limit: ${filesOverLimit.toString()}. Maximal file size is ${FILE_SIZE_LIMIT}`;
    return res.status(413).json({ status: 'error', message: sentence });
  }
  next();
};

/**
 * Middleware that checks if uploaded files meet max extension criteria from params.
 *
 * @param {string[]} allowedExtensions
 */
export const fileExtensionLimiter = (allowedExtensions) => {
  return (req, res, next) => {
    const files = req.files;
    const badFiles = [];
    Object.keys(files).forEach((key) => {
      if (!allowedExtensions.includes(path.extname(files[key].name))) {
        badFiles.push(files[key].name);
      }
    });

    if (badFiles.length > 0) {
      const sentence = `Upload failed. Files with wrong extension: ${badFiles.toString()}. Allowed extensions are ${allowedExtensions.toString()}`;
      return res.status(413).json({ status: 'error', message: sentence });
    }
    next();
  };
};

/**
 * Endpoint function that stores send image and return its path on server.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const imageUpload = async (req, res) => {
  const files = req.files;
  const imagePaths = [];
  try {
    for (const key of Object.keys(files)) {
      const imageFilePath = storeImage(files[key]);
      imagePaths.push(imageFilePath);
    }

    res.json({
      status: 'success',
      message: `${Object.keys(files).length} image${files.length > 1 ? 's' : ''} was successfuly uploaded.`,
      data: {
        serverFiles: imagePaths,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Async function that stores uploaded image into the public directory.
 *
 * @param {fileUpload.UploadedFile} file
 * @returns {string} Path to the file onto server
 */
const storeImage = (file) => {
  const date = new Date();
  const dateString = date.toISOString().replace(/[-:.TZ]/g, '');
  const fileExtension = path.extname(file.name);
  const filePath = path.join(__dirname, '../../public/uploadedImages', dateString + fileExtension);
  file.mv(filePath);
  return filePath;
};
