// This is just an example,
// so you can safely delete all default props below

export default {
    failed: '실패',
    success: '성공',

    pageTitle : {
        affiliate: '제휴 게임',
        challenge: '도전 게임',
        channelEdit: '채널 설정',
        home: '젬파이',
        join: '회원가입',
        joinEmail: '회원가입',
        joinEmailContinue: '회원가입',
        leave: '회원 탈퇴',
        login: '로그인',
        official: '공식 게임',
        profile: '프로필',
        resetPassword: '비밀번호 변경',
        searchResult: '검색 결과',
        error404: '존재하지 않는 페이지',
    },

    mainFooter : {
        support : {
            home : '고객센터',
            notice : '공지사항',
            faq : 'FAQ',
            inquiry : '1:1 문의',
            guide : '게임등록가이드',
            tos : '이용약관',
            policy : '개인정보취급방침',
        },
        company : {
            data1 : '(주)프롬더레드',
            data2 : '대표자 : 서상욱',
            data3 : '사업자번호 : 178-88-00617',
            data4 : '주소 : 서울특별시 서대문구 북아현로 105, 3층'
        },
    },

    layoutHeader : {
        routeTab : {
            home : '홈',
            official : '공식 게임',
            challenge : '도전 게임',
            affiliate : '제휴 게임',
            studio : '개발 스튜디오'
        },
        loginBtn : '로그인',
    },

    layoutFooter : {
        routeTab : {
            home : '홈',
            official : '공식 게임',
            challenge : '도전 게임',
            affiliate : '제휴 게임',
            channel : '내 채널'
        },
    },

    resetPassword : {
        emailInput : {
            label : '이메일',
            rule : '올바른 이메일을 입력해 주세요.',
        },
        btnLabel : '비밀번호 초기화',
        checkAlertMessage : '재설정 메일을 보냈습니다. 메일을 확인해 주세요.',
    },

    profile : {
        tab : {
            profile : '프로필',
            private : '보안 및 개인 정보',
        }
    },

    joinEmailContinue : {
        nicknameInput : {
            label : '이름',
            rule : '2글자 이상 12글자 이하로 입력 해주세요.',
        },
        nicknameError : '사용할 수 없는 단어가 포함되어 있습니다.', // 입력시 오류
        tos : {
            label : '이용약관 동의',
            showAll : '전체보기',
        },
        policy : {
            label : '개인정보취급방침 동의',
            showAll : '전체보기',
        },
        joinBtn : '회원가입',
        joinNicknameError : '사용할 수 없는 이름입니다.', // 회원가입 버튼 클릭시 오류
    },

    channelEdit : {
        profileImage : {
            label : '프로필 사진',
            description : '프로필 사진은 Zempie가 제공하는 서비스의 유저를 나타내는 위치에 표시됩니다.',
            btn : '프로필 사진 추가',
            hint : '1MB 이내의 JPEG, PNG 형식이어야 합니다.',
        },
        bannerImage : {
            label : '배너 이미지',
            description : '채널 상단에 표시되는 이미지로 자신만의 채널 특성을 표현해보세요.',
            btn : '이미지 업로드',
            hint : '파일 형식 : JPEG, PNG (1707*282 픽셀, 최대 15MB 권장)',
        },
        channel : {
            infoLabel : '정보',
            name : {
                label : '채널명',
                description : '자신의 콘텐츠를 잘 표현할 수 있는 채널 이름을 지어주세요.',
            },
            stateMessage : {
                label : '상태 메세지',
                description : '현재 자신의 기분을 표현해보세요.',
            },
            description : {
                label : '채널 설명',
                description : '채널에 대해 설명해주세요. 이 설명은 채널 정보에 표시되며 누구나 볼 수 있습니다.',
            },
            id : {
                label : '채널 ID',
                verifyRequest : '확인 요청',
                verifySuccess : '확인 완료',
                description : 'ID를 만들어 자신만의 접속 URL을 만들어 보세요.',

                specialCharacterError : "_, - 를 제외한 특수 문자는 사용할수 없습니다.",
                blankError : "아이디에 빈칸을 포함할수 없습니다.",
                fail : "사용할 수 없는 아이디 입니다.",
                success : "사용할 수 있습니다.",
            },
            url : {
                label1 : '채널 URL',
                label2 : '채널 URL',
                description : '채널의 표준 웹 주소입니다. 여기에는 URL 끝에 있는 숫자와 문자 조합인 고유 채널 ID가 포함되어 있습니다.',
            },
        },
        fileSizeError : '파일 사이즈가 너무 큽니다.',
        save : {
            btn : '저장',
            success : '저장 되었습니다.',
            fail : '실패 하였습니다.',
        },
    },

    reportPopup : {
        label : '게임 신고하기',
        category : {
            label : '카테고리',
            text1 : '폭력이 노골적입니다.',
            text2 : '콘텐츠가 선정적입니다.',
            text3 : '게임 내 비속한 표현(욕설, 비방 등)이 있습니다.',
            text4 : '스팸 또는 현혹하는 콘텐츠가 포함되어 있습니다.',
            text5 : '저작권 신고',
            text6 : '기타',
        },
        description : '게임을 신고하는 이유를 간단히 설명해 주세요.',
        file : '이미지 첨부',
        cancelBtn : '취소',
        submitBtn : '등록',
        successAlert : '성공적으로 신고가 접수되었습니다.',
        fileBtn : '이미지 첨부',
        fileTypeError : '이미지 파일이 아닙니다.',
        fileSizeError : '파일 사이즈가 너무 큽니다.',
        reasonError : '신고 사유가 있어야 합니다.',
    },

    searchGame : {
        inputLabel : '게임 검색하기',
        notResultLabel : '검색된 결과가 없습니다.',
    },

    joinEmail : {
        emailInput : {
            label : '이메일',
            rule : '올바른 이메일을 입력해 주세요.',
        },
        passwordInput : {
            label : '비밀번호',
            rule : '영문과 최소 1개의 숫자 혹은 특수 문자를 포함한 6~20자리 비밀번호를 입력해주세요.',
        },
        passwordCheckInput : {
            label: '비밀번호 확인',
            rule: '비밀번호가 다릅니다.',
        },
        nicknameInput : {
            label : '이름',
            rule : '2글자 이상 12글자 이하로 입력 해주세요.',
        },
        tos : {
            label : '이용약관 동의',
            showAll : '전체보기',
        },
        policy : {
            label : '개인정보취급방침 동의',
            showAll : '전체보기',
        },
        joinBtn : '회원가입',
        emailBlankError : '이메일을 입력해주세요.',
        passwordBlankError : '비밀번호를 입력해주세요.',
        nicknameError : '사용할 수 없는 이름입니다.',
        firebaseError : {
            password : '잘못된 비밀번호 입니다. 다시 입력하세요.',
            userNotFound : '등록된 이메일이 아닙니다. 회원가입 후 이용해 주세요.',
            emailAlreadyInUse : '이미 가입된 이메일 입니다.'
        }
    },

    login : {
        emailInput : {
            label : '이메일',
            rule : '올바른 이메일을 입력해 주세요.',
        },
        passwordInput : {
            label : '비밀번호',
            rule : '영문과 최소 1개의 숫자 혹은 특수 문자를 포함한 6~20자리 비밀번호를 입력해주세요.',
        },
        resetPasswordBtn : '비밀번호 찾기',
        loginBtn : '로그인',
        firstMessage : '처음이신가요?',
        joinBtn : '회원가입',
        googleLoginBtn : 'Google 계정으로 로그인',
        emailBlankError : '이메일을 입력해주세요.',
        passwordBlankError : '비밀번호를 입력해주세요.',
        joinError : '진행중인 회원가입이 절차가 남아 있습니다. 이어서 진행 해주세요.',
        firebaseError : {
            password : '잘못된 비밀번호 입니다. 다시 입력하세요.',
            userNotFound : '등록된 이메일이 아닙니다. 회원가입 후 이용해 주세요.',
        },
        googleJoinError : '회원가입 후 이용하세요.',
        facebookJoinError : '회원가입 후 이용하세요.',
    },

    leave : {
        label : '회원 탈퇴',
        description : {
            text1: '회원탈퇴 시 개인 정보 및 Zempie에서 만들어진 모든 데이터는 삭제됩니다.',
            text2: '1. 모든 게임 플레이 정보 및 구매 정보는 삭제됩니다.',
            text3: '2. 서비스 이용시 보유하고 있던, 개인의 모든 재산은 삭제됩니다.',
            text4: '3. 사이버 머니가 남아있을 시, 탈퇴 정채겡 의해 환불에 따른 수수료 지급 및 소액 잔액 미환급 등의 불이익이 있을 수 있습니다.',
            text5: '4. 회원탈퇴를 하더라도 특정한 사유가 있을 시 일정 기간동안 개인정보를 보관할 수 있습니다.',
            text6: '5. 회원 탈퇴 진행 시 해당 아이디는 영구적으로 삭제되어 재가입이 불가능합니다.',
        },
        reason : {
            label : '탈퇴 사유',
            inputPlaceholder: '탈퇴 사유를 입력해주세요.',
            check1 : '미결 거래로 인한 수익금을 지급받을 수 없다는 사실을 이해합니다.',
            check2 : '해당 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다.',
        },
        btn : '회원 탈퇴',
        confirmMessage : '정말로 탈퇴하시겠습니까?',
    },

    join : {
        nickname : {
            label : '이름',
            rule : '2글자 이상 12글자 이하로 입력 해주세요.',
        },
        tos : {
            label : '이용약관 동의',
            showAll : '전체보기',
        },
        policy : {
            label : '개인정보취급방침 동의',
            showAll : '전체보기',
        },
        btn : '회원가입',
        joinNicknameError : '사용할 수 없는 이름입니다.',
        nicknameError : '사용할 수 없는 단어가 포함되어 있습니다.'
    },

    channel : {
        editBtn : '채널 설정',
        tab : {
            game : '등록한 게임',
            info : '정보',
        },
        descriptionLabel : '설명',
        businessLabel : '비즈니스 문의',
    },

    profileTab : {
        profileImage : {
            label : '프로필 사진',
            btn : '프로필 사진 변경',
            description : '1MB 이내의 JPEG, PNG 형식이어야 합니다.',
        },
        info : {
            label : '정보',
            emailLabel : '이메일',
            verifySuccess : '인증 완료',
            verifyRequest : '인증 요청',
            nicknameLabel : '이름',
        },
        saveBtn : '저장',
        fileSizeError : '파일 사이즈가 너무 큽니다.',
        emailCheck : '인증 메일을 보냈습니다. 등록된 메일함을 확인해 주세요.',
        manyRequest : '요청 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.',
        nicknameError : '사용할 수 없는 이름입니다.',
        fail : '실패 하였습니다.',
        success : '저장 되었습니다.',
    },

    profilePrivateTab : {
        contactLabel : '연락처',
        emailLabel : '이메일',
        resetPassword : {
            label : '보안',
            text1 : '비밀번호 변경은 ',
            text2 : '여기',
            text3 : '를 클릭해주세요.',
        },
        leave : {
            label : '계정 비활성화',
            text1 : '계정 비활성화는 ',
            text2 : '여기',
            text3 : '를 클릭해주세요.',
        },
        confirmMessage : '재설정 메일을 보내시겠습니까?',
        emailCheck : '재설정 메일을 보냈습니다. 메일을 확인해 주세요.',
    },

    sortCategory : {
        text1 : '최신순',
        text2 : '오래된순',
        text3 : '이름순',
    },

    mainCarousel : {
        slide1 : {
            main : '고퀄리티 캐주얼 게임',
            sub : '누구나 무료로 게임을 즐겨 보세요!',
        },
        slide2 : {
            main : '고퀄리티 캐주얼 게임',
            sub : '누구나 무료로 게임을 즐겨 보세요!',
        },
        slide3 : {
            main : '고퀄리티 캐주얼 게임',
            sub : '누구나 무료로 게임을 즐겨 보세요!',
        },
    },

    homeCategory : {
        moreGame : {
            official : '더 보기',
            challenge : '더 보기',
        }
    },

    accountPopup : {
        accountLabel : '계정',
        profileLabel : '내 프로필',
        channelLabel : '내 채널',
        supportLabel : '고객센터',
        logoutLabel : '로그아웃',
    },

    mailPopup : {
        mailLabel : '',
        date : {
            minute : '분',
            hour : '시간',
            day : '일',
            month : '개월',
            year : '년',
            before : ' 전',
        },
        noMail : '알림이 없습니다.',
    },

    error404 : {
        mainText : '존재하지 않는 페이지',
        moveHome : '홈으로 이동',
    },

    challengeCarousel : {
        main : '상상하는 모든 게임',
        sub : '챌린지는 누구나 업로드 할 수 있는 창작 게임 게시판 입니다.',
    },

    affiliateCarousel : {
        main : '더 다양한 게임',
        sub : '간편하게 인기 게임들을 마음껏 즐겨보세요.',
    },

    genreCategory : {
        text1 : '전체보기',
        text2 : '아케이드',
        text3 : '스포츠',
        text4 : '액션',
        text5 : '전략',
        text6 : '퍼즐',
    },

    gameCard : {
        playLabel : ' plays',
        tenThousand : '만',
        playCountLabel : '회',
        moveChannel : '개발자 채널 가기',
        reportGame : '게임 신고 하기',
        cancelLabel : '취소',

    }
};
