/**
 * Lấy danh sách phim.
 * url:http://localhost:3000/users
 * method:get
 */




app.get(
  "/users",
  (req, res, next) => {
    console.log("Đâ là tính năng lấy danh sách người dùng");
    next(); // chạy tiếp tục
  },
  (req, res) => {
    try {
      res.status(200).send(userList);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/**
 * Lấy thông tin chi tiết người dùng.
 * url:http://localhost:3000/users/1
 * method:get
 */
app.get("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = userList.find((item) => item.id === +id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("id không tôn tại nhen mầy, bố láo");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Thêm người dùng.
 * url:http://localhost:3000/users
 * method:post
 * body:{...}
 */

app.post(
  "/users",
  (req, res, next) => {
    const { name } = req.body;
    if (name.length >= 3 && name.length <= 100) {
      next();
    } else {
      res.status(400).send({ messages: "độ dài tên phải từ 3-100" });
    }
  },
  (req, res) => {
    try {
      const { name, email, password, phone, role } = req.body;
      const newUser = { name, email, password, phone, role, id: Math.random() };
      userList.push(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/**
 * Cập nhật người dùng
 * url:http://localhost:3000/users/1
 * method:put/patch
 * data:{...}
 */

/**
 * Xóa người dùng
 * url:http://localhost:3000/users/1
 * method:delete
 * data:{...}
 */
