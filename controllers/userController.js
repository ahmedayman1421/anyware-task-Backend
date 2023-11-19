import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.js";

export const getUser = catchAsync(async (req, res, next) => {
  const id = req.user?.id || req.params.id;
  const token = req.token ? req.token : null;
  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

export const getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    count: users.length,
    data: users,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm || req.body.role)
    next(new AppError("Tou can't update password or role here", 400));

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});
