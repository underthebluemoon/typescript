// -------------------------------------------------------------------
// interface : 설계도. 값 부여 불가
interface User {
    readonly id: number;
    name: string;
    age?: number;

}
const user: User = {
    id: 1,
    name: '홍길동',  // 필수값 -> 없을 시 에러
    age: 1,  // optional
}
// user.id = '2'  // error -> readonly

// -------------------------------------------------------------------
// 인터페이스 확장
// `extends` 키워드 사용 -> 기존 인터페이스를 상속해서 확장해 나가는 기법. 사용 빈도 낮음
interface Animal {
    name: string;
}
interface Human extends Animal {
    age: number;
}
interface Douner extends Animal, Human {
    kinds: string;
}

// -------------------------------------------------------------------
// 선언 병합
interface Dog { name: string; }
interface Dog { age: number; }
const dog: Dog = {
    name: '흰둥이',
    age: 3  // 필수값
}

// -------------------------------------------------------------------
// 메소드 정의
interface Dog {
    // 1. 함수 타입 프로퍼티 방식 : 데이터 체크 더 엄격
    barking: (arg: Animal) => void;
    // 2. 메소드 시그니처 빙식 : 불안정한 대입도 허용
    barking2(arg: Animal) :void;
}
let humanBarking = (arg: Human) => console.log(arg.name);
const dog2: Dog = {
    // barking : `name`만 필요 / HumanBarking : `name`, `age` 필요. 더 좁은 처리
    // barking: humanBarking,
    barking2: humanBarking
}

// -------------------------------------------------------------------
// 메소드 오버로딩
interface Cat {
    // 함수타입 프로퍼티로는 메소드 오버로딩이 불가능 - 변수(키값) 중복 선언 불가
    // mya: () => void;
    // mya: (arg: string) => void;

    // 메소드 시그니처 방식으로 메소드 오버로딩 가능 - 함수 정의 추가
    mya(): void;
    mya(arg: string): void;
}
