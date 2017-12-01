
/*
 * 설정
 */


module.exports = {
	server_port: 3000,
	// db_url: 'mongodb://admin2000:3590dany@ds237815.mlab.com:37815/heroku_k7rvp5k3',
	db_url:'mongodb://localhost:27017/local',
	db_schemas: [
    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'}
    ,{file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
	,{file:'./toefl/register_schema', collection:'register', schemaName:'RegisterSchema', modelName:'RegisterModel'}
	,{file:'./toefl/speaking_schema', collection:'speaking', schemaName:'SpeakingSchema', modelName:'SpeakingModel'}
	,{file:'./toefl/reading_schema', collection:'reading', schemaName:'ReadingSchema', modelName:'ReadingModel'}
	,{file:'./toefl/listening_schema', collection:'listening', schemaName:'ListeningSchema', modelName:'ListeningModel'}
	,{file:'./toefl/writing_schema', collection:'writing', schemaName:'WritingSchema', modelName:'WritingModel'}	
	],

// routing information 설정

	route_info: [
         {file:'./post', path:'/process/addpost', method:'addpost', type:'post'}
        ,{file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
		,{file:'./post', path:'/process/addcomment', method:'addcomment', type:'post'}
 
// 토플 시험등록 라우팅 구성
		,{file:'./toefl/toeflTeacher/registration/register', path:'/register/addregister', method:'addregister', type:'post'}
		,{file:'./toefl/toeflTeacher/registration/register', path:'/register/updateregister', method:'updateregister', type:'post'}
		,{file:'./toefl/toeflTeacher/registration/register', path:'/register/removeregister', method:'removeregister', type:'post'}
		,{file:'./toefl/toeflTeacher/registration/register', path:'/register/listregister', method:'listregister', type:'post'}  
		,{file:'./toefl/toeflTeacher/registration/register', path:'/register/exampost/:id', method:'exampost', type:'get'}  

//addExam routes 
		,{file:'./toefl/toeflTeacher/toefl_Teacher', path:'/toeflTeacher/reading', method:'reading', type:'post'}
		,{file:'./toefl/toeflTeacher/toefl_Teacher', path:'/toeflTeacher/listening', method:'listening', type:'post'}
		,{file:'./toefl/toeflTeacher/toefl_Teacher', path:'/toeflTeacher/writing/integrated', method:'writing', type:'post'}
		,{file:'./toefl/toeflTeacher/toefl_Teacher', path:'/toeflTeacher/writing/independent', method:'writing', type:'post'}

// reading routes 
 
    	,{file:'./toefl/toeflTeacher/reading/reading', path:'/process/toefl/reading/addproblemreading', method:'addproblemreading', type:'post'}

// listening routes
		// ,{file:'./multer', path:'/process/multer/updatelistening', method:'updatelistening', type:'post'}
		,{file:'./toefl/toeflTeacher/listening/multerAddProblem', path:'/process/toefl/listening/multerAddProblemListening', method:'addProblemListening', type:'post'}

// speaking init
		,{file:'./toefl/toeflTeacher/speaking/speaking',path:'/toefl/toeflTeacher/speaking', method:'speaking', type:'post'}
		,{file:'./toefl/toeflTeacher/speaking/multerSpeaking',path:'/process/toefl/speaking/multerAddSpeaking', method:'addProblemSpeaking', type:'post'}
		
			
// writing routes

		,{file:'./toefl/toeflTeacher/writing/multerWriting', path:'/process/toefl/writing/multerAddWriting', method:'addProblemWriting', type:'post'}

// student routes
		,{file:'./student', path:'/toeflStudent/reading', method:'student', type:'post'}
	],

	facebook: {		// passport facebook
		clientID: '135410020365220',
		clientSecret: 'eddf4b09927e3c1364fec8b6567f1400',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileFields : ['id','displayName', 'email']
	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: '759302388839-vtgqk2vivar3f4ogsl93hnit12s8qghi.apps.googleusercontent.com',
		clientSecret: 'NsZqvb00dq1iSMaENpFqHf6k',
		callbackURL: 'http://localhost:3000/auth/google/callback',
                profileFields : ['id','displayName', 'email']	
	},
	instagram: {		// passport instagram
		clientID: 'id',
		clientSecret:'secrets', 
		callbackURL: '/auth/instagram/callback',
                profileFields : ['id','displayName', 'email']	
	},
	kakao: {		// passport kakao    
		clientID: 'ac687e350d255939423d2f698d71b433',
	        clientSecret: 'A7BKEdDYFsqxrnANLd9tRDeyRAfg4Fy9',
		callbackURL: 'http://localhost:3000/auth/kakao/callback'
 	},
	naver: {		// passport google
		clientID: 'id',
		clientSecret:'naver', 
		callbackURL: '/auth/naver/callback',
                profileFields : ['id','displayName', 'email']	 
	}
}