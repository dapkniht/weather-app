<details open>
<summary>`Login`</summary>
- **Endpoint**: `/api/login`
- **HTTP Method**: `POST`
- **Deskripsi**: Autentikasi pengguna dan mendapatkan token akses.
- **Request**:
  - **Header**: None
  - **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Contoh Respons sukses**:
  - **200 OK**:
    ```json
    {
        "status": "sukses",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o",
        "kadaluarsa": 3600000
    }
    ```
- **Contoh Respons Gagal**
  - **401 Unauthorized**:
    ```json
    {
        "status": "gagal",
        "pesan": "Email atau Password tidak ditemukan"
    }
    ```
</details>
