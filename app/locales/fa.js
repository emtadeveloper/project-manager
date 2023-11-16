const lanquage = {
    auth: {
        DuplicateUserName: "نام کاربری قبلا در سیستم استفاده شده است",
        WrongUserName: "نام کاربری صحیح  نمی باشد",
        SuccessLogin: "شما با موفقیت وارد حساب کاربری خود شدید",
        EmptyUserName: "نام کاربری نمیتواند خالی باشد",
        WrongEmail: "ایمیل وارد شده صحیح نمیباشد",
        DuplicateEmail: "ایمیل وارد شده قبلا استفاده شده است",
        WrongPhoneNumber: "شماره موبایل وارد شده صحیح نمیباشد",
        DuplicatePhoneNumber: "شماره موبایل وارد شده قبلا استفاده شده است",
        EmptyPassword: "رمز عبور نمیتواند خالی باشد",
        MaxMinPassword: "رمز عبور حداقل باید 6 و حداکثر 16 نویسه باشد",
        WrongUserNameOrPassword: "نام کاربری یا رمز عبور اشتباه میباشد",
        DoNotRepeatTheSamePassword: "رمز عبور با تکرار آن یکسان نمیباشد",
    },
    user: {
        UpdateProfile: "به روز رسانی  با موفقیت انجام شد",
        WrongUpdateProfile: "به روز رسانی انجام نشد",
        ChooesImage: "لطفا یک تصویر را انتخاب کنید",
        WrongFormatImage: "فرمت ارسال شده صحیح نمیباشد",
        HighFileSize: "حجم فایل نمیتواند بیبشتر از 2 مگابایت باشد",
    },
    middlewares: {
        wrongLogin: "لطفا وارد حساب کاربری خود شوید",
        wrongId: "شناسه ی ارسال شده صحیح نمیباشد",
    },
    project: {
        Emptytitle: "عنوان پروژه نمیتواند خالی باشد",
        tagValidate: "حداکثر استفاده از هشتگ ها 10 عدد میباشد",
        textValidate: " توضیحات پروژه نمیتواند خالی باشد و حداقل باید 25 کاراکتر باشد",
        FailedAdd: "افزودن پروژه با مشکل مواجه شد",
        SuccessAdd: "پروژه با موفقیت ایجاد شد",
        NotFoundProject: "پروژه ای یافت نشد",
    },
    image: {
        EmptyImage: "لطفا یک تصویر را انتخاب کنید",
        WrongFormatImage: "فرمت ارسال شده صحیح نمیباشد",
        ImageSizeImage: "حجم فایل نمیتواند بیبشتر از 2 مگابایت باشد",
    },
};
module.exports = {lanquage};
