const validate = (values) => {
    const errors = {};
    const {
 username, password
} = values;

    if (!username) {
        errors.username = 'Tên đăng nhập không được để trống';
    }

    if (!password) {
        errors.password = 'Mật khẩu không được để trống';
    }
    return errors;
};
export default validate;
