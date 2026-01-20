// -------------------------------------------------------------------
// 클래스 상속
class Mammal {
    constructor(
        protected name: string,
        protected residence: string,
    ) {
        this.name = name;
        this.residence = residence;
        console.log('포유류 입니다.');
    }

    public breath(): void {
        console.log(`${this.name}이/가 폐호흡합니다.`)
    }

}
class Whale extends Mammal {
    constructor(name: string, residence: string) {
        // 자식 쪽에서 생성자 메소드를 정의할 경우, 반드시 부모 생성자를 먼저 호출 후 후속 처리
        super(name, residence);  // 부모 생성자 메소드 호출
        console.log('자식 고래');
    }

    // 오버라이딩 : 부모에게 상속받은 메소드를 자식이 재정의하여 사용하는 것
    // ver.4.3 + 부터 `override` 키워드를 메소드명 앞에 붙여 명시
    override breath(): void {
        console.log(`룰루랄라`)
    }

    public swimming(): void {
        console.log(`${this.name}이/가 헤엄칩니다.`)
    }
}
class FlyingSquirrel extends Mammal {
    // 자식 쪽 생성자를 생략할 경우, 자동으로 부모 생성자 호출
    public flying(): void {
        console.log(`${this.name}이/가 날아갑니다.`)
    }
}
const whale: Whale = new Whale('라분', '바다');  // 자식의 constructor가 없음 -> 부모 생성자 호출
whale.breath;  // 상속해서 접근 가능
const flyingSquirrel: FlyingSquirrel = new FlyingSquirrel('다람이', '숲');

// -------------------------------------------------------------------
// 오버라이딩 : 25번 줄 참고
