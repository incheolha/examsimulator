
/*
 * 설정
 */


module.exports = {
	server_port: 3000,
	db_url: 'mongodb://admin2000:3590dany@ds237815.mlab.com:37815/heroku_k7rvp5k3',
	// db_url: 'mongodb://admin20000:3590dany@ds155414.mlab.com:55414/heroku_53dpsf7n',
	// db_url:'mongodb://localhost:27017/local',
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
     	,{file:'./multer', path:'/process/multer/updatelistening', method:'updatelistening', type:'post'}
		,{file:'./toefl/listening/multerAddProblem', path:'/process/toefl/listening/multerAddProblemListening', method:'addProblemListening', type:'post'}
// 토플 시험등록 라우팅 구성
		,{file:'./toefl/registration/register', path:'/register/addregister', method:'addregister', type:'post'}
		,{file:'./toefl/registration/register', path:'/register/updateregister', method:'updateregister', type:'post'}
		,{file:'./toefl/registration/register', path:'/register/removeregister', method:'removeregister', type:'post'}
		,{file:'./toefl/registration/register', path:'/register/listregister', method:'listregister', type:'post'}  
		,{file:'./toefl/registration/register', path:'/register/exampost/:id', method:'exampost', type:'get'}  
		 

//file: js file location path: route path (사용자가 보기좋게.) method: function() what to do , type:post.
		 
//addExam routes 
		,{file:'./toefl_Teacher', path:'/toeflTeacher/reading', method:'reading', type:'post'}
		,{file:'./toefl_Teacher', path:'/toeflTeacher/listening', method:'listening', type:'post'}
		,{file:'./toefl_Teacher', path:'/toeflTeacher/speaking/ch1', method:'speaking', type:'post'}
		,{file:'./toefl_Teacher', path:'/toeflTeacher/writing/integrated', method:'writing_int', type:'post'}
		,{file:'./toefl_Teacher', path:'/toeflTeacher/writing/independent', method:'writing_ind', type:'post'}
		
// reading routes 
 
	,{file:'./toefl/reading/reading', path:'/process/toefl/reading/addreading', method:'addreading', type:'post'}
	,{file:'./toefl/reading/reading', path:'/process/toefl/reading/updatereading', method:'updatereading', type:'post'}
	,{file:'./toefl/reading/reading', path:'/process/toefl/reading/removereading', method:'removereading', type:'post'}
    ,{file:'./toefl/reading/reading', path:'/process/toefl/reading/listreading', method:'listreading', type:'post'}  
    ,{file:'./toefl/reading/reading', path:'/process/toefl/reading/listreading', method:'listreading', type:'get'}  
    ,{file:'./toefl/reading/reading', path:'/process/showreading/:id', method:'showreading', type:'get'}
    ,{file:'./toefl/reading/reading', path:'/process/toefl/reading/addproblemreading', method:'addproblemreading', type:'post'}



// listening routes
		,{file:'./toefl/listening/listening', path:'/process/toefl/listening/addlistening', method:'addlistening', type:'post'}
		// ,{file:'./toefl/listening/listening', path:'/process/toefl/listening/addProblem', method:'addProblem', type:'post'}
		,{file:'./toefl/listening/listening', path:'/process/toefl/listening/updatelistening', method:'updatelistening', type:'post'}
		,{file:'./toefl/listening/listening', path:'/process/toefl/listening/removelistening', method:'removelistening', type:'post'}
		,{file:'./toefl/listening/listening', path:'/process/toefl/listening/listlistening', method:'listlistening', type:'post'}        

// speaking init
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/addspeaking', method:'addspeaking', type:'post'}   
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/updatespeaking', method:'updatespeaking', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/removespeaking', method:'removespeaking', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/listspeaking', method:'listspeaking', type:'post'}

		,{file:'./toefl/speaking/multerSpeaking',path:'/process/toefl/speaking/multerAddSpeaking', method:'addProblemSpeaking', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/ch2', method:'speaking_ch2', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/ch3', method:'speaking_ch3', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/ch4', method:'speaking_ch4', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/ch5', method:'speaking_ch5', type:'post'}
		,{file:'./toefl/speaking/speaking', path:'/process/toefl/speaking/ch6', method:'speaking_ch6', type:'post'}
			
// writing routes

		,{file:'./toefl/writing/multerWriting', path:'/process/toefl/writing/multerAddWriting', method:'addProblemWriting', type:'post'}
		,{file:'./toefl/writing/writing', path:'/process/toefl/writing/addwriting', method:'addwriting', type:'post'}
		,{file:'./toefl/writing/writing', path:'/process/toefl/writing/updatewriting', method:'updatewriting', type:'post'}
		,{file:'./toefl/writing/writing', path:'/process/toefl/writing/removewriting', method:'removewriting', type:'post'}
		,{file:'./toefl/writing/writing', path:'/process/toefl/writing/listwriting', method:'listwriting', type:'post'}
        ,{file:'./toefl/writing/writing', path:'/process/toefl/writing/showwriting/:id', method:'showwriting', type:'get'}
        ,{file:'./toefl/writing/writing', path:'/process/toefl/writing/addproblem', method:'addproblem', type:'post'}

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