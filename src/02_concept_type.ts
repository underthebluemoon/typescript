// -------------------------------------------------------------------
// 타입스크립트의 집합론
// number : -1. 0, 2, 5, ...
// boolean : true, false
// string : 'a', 'bbb', ...
// 객체 내부의 구조(property)를 기준으로 타입을 결정하는 구조적 타입 시스템
type Animal = {
    name: string;
}
type Human = {
    type: 'HUMAN';
    name: string;
    lang: string;
}
type Dog = {
    type: 'DOG';
    name: string;
    age: number;
}
// Animal은 Human과 Dog의 superset

// -------------------------------------------------------------------
// 타입 호환성 : A와 B, 두 개의 타입이 존재할 때, A타입의 값을 B타입으로 취급해도 괜찮은지 판단하는 것
let num1: number = 1;
let num2: 2 = 2;
num1 = num2;  // 호환 가능. number 타입 변수에 2라는 구체적인 값을 할당.
// num2 = num1;  // 호환 불가능. 2만 들어갈 수 있는 공간에 number 전체(어떤 숫자가 올지 모름)를 할당.

const dog: Dog = { name: '흰둥이', age: 20 };
const animal: Animal = dog;  // animal에 dog 할당. 자식 타입을 부모 타입으로 upcasting
animal.name;
// animal.age;  // upcasting 한 경우, 부모 타입에서 가지지 않은 값 사용 불가.
// const dog2: Dog = animal;  // TypeScript의 경우, downcasting 불가

// -------------------------------------------------------------------
// 초과 속성 체크
// 객체 리터럴을 직접 대입하는 상황에서 실수 방지를 위해 더 엄격하게 체크
const animal2: Animal = {
    name: '검둥이'
    // , age: 20  // 리터럴 할당 : 해당 타입으로 바로 선언 후 값을 넣는 경우, 에러 발생
    // 다른 변수에 담아 할당한 경우(dog) 잉여 속성이 있어도 가능 (구조적 타이핑)
};

// -------------------------------------------------------------------
// 타입 추론 : 명시적으로 타입을 적지 않아도, 타입스크립트가 코드를 분석해서 타입을 결정하는 기능
// 1. 일반 변수의 타입 추론
let num3 = 1;  // number로 타입 추론 - 재할당 가능성
const num4 = 1;  // 1 number literal로 타입 추론 : 1

// 2. 객체의 타입 추론
let obj = { name: '홍길동' , age: 20 };
// obj = { lang: 'ko' };  // obj는 이미 { name, age }의 literal 값을 기대하므로, 그 외의 값은 에러 발생

// 3. 구조 분해 할당의 타입 추론
let [num5, str5, bool5] = [1, 'str', true];

// 4. 함수의 리턴 타입 추론
function test1(a: number, b: number) {
    return a + b;
}

// 5. 기본값이 설정된 파라미터의 타입 추론
function test2(msg = 'test') {
    return 'hi';
}

// 6. 최적 공통 타입 추론
let arr = [1, 'hi', false];

// -------------------------------------------------------------------
// 타입 단언: 개발자가 해당 타입에 대한 확실한 정보를 가지고 있을 때, 
//          컴파일러에게 특정 타입을 강제로 지정하는 기능
let num6 = 10 as never;
// let num7 = 10 as string;  // 슈퍼셋 or 서비스세이 아닌 타입으로는 단언 불가능
const main = document.querySelector('main') as HTMLElement;

// Non-null 단언 연산자 : 값이 null이나 undefined가 아님을 확신할 때, `!`를 이용해서 타입 단언
type User = {
    name: string;
    age?: number;
}
const user: User = { name: '홍길동' };
user.name.toString();
user.age!.toString();  // optional

// const 단언 : 모든 프로퍼티가 readonly를 갖도록 단언 가능. 사용 빈도 낮음
let user2 = {
    name: '둘리',
    age: 40,
} as const;  // literal의 경우, 'readonly' 사용 불가 (타입 선언 시에만 가능)

// -------------------------------------------------------------------
// 타입 좁히기 : 여러 타입이 섞여있는 상황에서, 조건문을 통해 특정 범위로 타입을 제한
function printVal(val: number | string | null): void {
    if(typeof val === 'number') {
        console.log(val.toFixed(2));
    } else if(typeof val === 'string') {
        console.log(val.toUpperCase());
    } else {
        console.log('null 이다.');
    }  // typeof null === object
}

// 객체의 타입 좁히기 : `in` 연산자 이용
function whatIsKinds(animal: Human | Dog) {
    if('lang' in animal) {
        animal.lang;
    } else {
        animal.age;
    }
}

// 클래스 인스턴스 좁히기 : `instanceof` 연산자
class Dog2 { bark: string = '멍'}
class Cat2 { walk: string = '사뿐사뿐'}
function chkClass(animal: Dog2 | Cat2) {
    if(animal instanceof Dog2) {
        animal.bark;
        // animal.walk;  // -> 사용불가
    } else {
        animal.walk;
        // animal.bark;  // -> 사용불가
    }
}

// 서로소 유니온 타입 좁히기 
function test3(animal: Human | Dog) {
    if(animal.type === 'HUMAN') {
        animal.lang;
    } else {
        animal.age;
    }
}
