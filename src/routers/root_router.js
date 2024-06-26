const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  
  // 각자 사용할 router 정의

  //게시판 메인 라우터
  const boardRouter = require("./board/board_router")
  app.use("/board", boardRouter)
  

  // login 부분 router 정의
  const loginRouter = require("./login/login_router")(app);
  const bm_router = require("./board_main/bm_router");
  app.use("/board", bm_router);
  app.use("/login", loginRouter);

  // register 부분 router 정의
  const registerRouter = require("./register/register_router")(app);
  app.use("/register", registerRouter);

  const markgetRoter = require("./market/market_router")(app);
  app.use("/market", markgetRoter);

  const walletRouter = require("./wallet/wallet_router")(app);
  app.use("/wallet", walletRouter);

  // root경로의 router
  const router = require("express").Router();
  router.get("/", (req, res) => {
    
    const logoPath = "../../img/logo/banner_logo.png";
    const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
    const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

    const copyrightPath = "../../img/logo/logo.png";
    const copyrightBase64 = fs.readFileSync(path.join(__dirname, copyrightPath), 'base64');
    const copyrightURI = `data:image/jpeg;base64,${copyrightBase64}`;

    const mainPath = "../../img/main/main2.png";
    const mainBase64 = fs.readFileSync(path.join(__dirname, mainPath), 'base64');
    const mainURI = `data:image/jpeg;base64,${mainBase64}`;
    
    // 로그인 세션 정보를 로고 정보와 같이 보냄
    const sessionValue = {
      member : req.session.member,
      logoDataURI : logoDataURI,
      copyrightURI : copyrightURI,
      mainURI : mainURI
    };

    res.render("root", sessionValue);
  })
  return router;
};
