const path = require('path');

type PathConfig = {
	controllers: {
		api: string;
		web: string;
	};
	model: string;
	transform: string;
	controller: string;
};

type Config = {
	port: number;
	secret: string;
	path: PathConfig;
};

const config: Config = {
  port: 8080,
  secret: '@#$%^&*(lkj)(*!@OIJS)!(@IJLK234SALH2ondlv215kj)@(U*)($653',
  path: {
    controllers: {
      api: path.resolve('./modules/controllers/api'),
      web: path.resolve('./modules/controllers/web')
    },
    model: path.resolve('./modules/models'),
    transform: path.resolve('./modules/transforms'),
    controller: path.resolve('./modules/controllers'),
  }
}

export default config