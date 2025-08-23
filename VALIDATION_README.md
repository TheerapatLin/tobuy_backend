# Input Validation Guide

## การใช้งาน Input Validation ในระบบ Authentication

### 1. Validation Rules

#### Username Validation:
- ความยาว: 3-30 ตัวอักษร
- อนุญาต: ตัวอักษร (a-z, A-Z), ตัวเลข (0-9), underscore (_)
- ไม่สามารถเป็นค่าว่างได้

#### Email Validation:
- ต้องเป็นรูปแบบอีเมลที่ถูกต้อง
- จะถูก normalize ให้เป็นรูปแบบมาตรฐาน
- ไม่สามารถเป็นค่าว่างได้

#### Password Validation:
- ความยาวขั้นต่ำ: 8 ตัวอักษร
- ต้องประกอบด้วย:
  - ตัวพิมพ์เล็กอย่างน้อย 1 ตัว
  - ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว
  - ตัวเลขอย่างน้อย 1 ตัว
  - อักขระพิเศษอย่างน้อย 1 ตัว (@$!%*?&)
- ไม่สามารถเป็นค่าว่างได้

### 2. Error Response Format

เมื่อเกิด validation error จะได้รับ response ในรูปแบบ:

```json
{
  "message": "ข้อมูลไม่ถูกต้อง",
  "errors": [
    {
      "field": "username",
      "message": "Username ต้องมีความยาว 3-30 ตัวอักษร"
    },
    {
      "field": "password",
      "message": "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"
    }
  ]
}
```

### 3. การใช้งานใน Frontend

#### Signin:
```javascript
// รับ username หรือ email
const { username, password } = formData;

// Validation จะถูกตรวจสอบที่ backend
```

#### Signup:
```javascript
// รับ username, email, password
const { username, email, password } = formData;

// Frontend validation สำหรับ confirm password
if (password !== confirmPassword) {
  setErrors({ confirmPassword: 'รหัสผ่านไม่ตรงกัน' });
}
```

### 4. Security Features

- **Input Sanitization**: ใช้ `trim()` เพื่อลบ whitespace
- **Email Normalization**: แปลงอีเมลให้เป็นรูปแบบมาตรฐาน
- **Password Strength**: ตรวจสอบความแข็งแกร่งของรหัสผ่าน
- **SQL Injection Protection**: ใช้ parameterized queries

### 5. Error Handling

- **Field-specific Errors**: แสดงข้อผิดพลาดเฉพาะแต่ละ field
- **General Errors**: แสดงข้อผิดพลาดทั่วไป
- **User-friendly Messages**: ข้อความเป็นภาษาไทยและเข้าใจง่าย

### 6. Testing Examples

#### Valid Username:
- `john_doe123` ✅
- `user` ✅
- `test_user_123` ✅

#### Invalid Username:
- `ab` ❌ (สั้นเกินไป)
- `user@domain` ❌ (มีอักขระพิเศษ)
- `user name` ❌ (มีช่องว่าง)

#### Valid Password:
- `Password123!` ✅
- `MyPass@word1` ✅
- `Secure#Pass2` ✅

#### Invalid Password:
- `password` ❌ (ไม่มีตัวพิมพ์ใหญ่, ตัวเลข, อักขระพิเศษ)
- `Password` ❌ (ไม่มีตัวเลข, อักขระพิเศษ)
- `pass123` ❌ (สั้นเกินไป, ไม่มีตัวพิมพ์ใหญ่, อักขระพิเศษ)
