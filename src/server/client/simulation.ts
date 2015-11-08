class Cart {
    x_pp : number;
    constructor(public x:number, public x_p:number){
    }
    integrate(t:number){
        this.x = this.x + this.x_p * t + this.x_pp * t * t / 2;
        this.x_p = this.x_p + this.x_pp * t;
    }
}

class Stick {
    th_pp: number;
    constructor(public th: number, public th_p: number) {
    }
    integrate(t: number) {
        this.th = this.th + this.th_p * t + this.th_pp * t * t / 2;
        this.th_p = this.th_p + this.th_pp * t;
    }
}
class Controller {
    constructor(public a: number, public b: number, public c: number, public d:number) {
    }
    getForce(x:number, th:number, x_p:number, th_p:number):number {
        var f = this.a * x + this.b * (th - Math.PI / 2) + this.c * x_p + this.d * th_p;
        return f;
    }
}

class Pendulum {
    constructor(public cart:Cart, public stick:Stick) {
    }

    knockStick(angle: number) {
        this.stick.th -= angle * Math.PI / 180;
    }
        
    solve(f:number){
        var th = this.stick.th;
        var th_p = this.stick.th_p;

        var co = Math.cos(th);
        var si = Math.sin(th);
        var x_pp = (co * th_p * th_p - 2 * co * si + 2 * f) / (4 - 2 * si * si);
        var th_pp = -2 * co + 2 * si * x_pp;

        this.cart.x_pp = x_pp;
        this.stick.th_pp = th_pp;
    }
    integrate(t:number){
        this.cart.integrate(t);
        this.stick.integrate(t);
    }
}
class Simulation {

    span: HTMLElement;
    timerToken: number;
    timerTokenDisplay: number;
    pendulum: Pendulum
    controller: Controller
    dt: number

    constructor(public elements: any) {
        //initialization
        this.dt = 0.01;
        var cart = new Cart(0, 0);
        var stick = new Stick(Math.PI / 2, 0);
        this.controller = new Controller(1, -14.8452, 5.97415, -13.7966);
        this.pendulum = new Pendulum(cart, stick); 
    }

    step() {
        var f = this.controller.getForce(this.pendulum.cart.x, this.pendulum.stick.th, this.pendulum.cart.x_p, this.pendulum.stick.th_p);
        //f = 0;
        this.pendulum.solve(f);
        this.pendulum.integrate(this.dt);    
    }

    display() {
        var thetaAttr = (this.pendulum.stick.th * 180 / Math.PI).toString();
        var xAttr = (this.pendulum.cart.x * 100).toString();
        var xVal = (this.pendulum.cart.x).toString();
        this.elements.thetaValue.innerText = thetaAttr;
        this.elements.xValue.innerText = xVal;
        this.elements.x.setAttribute("transform", "translate(" + xAttr + ")");
        this.elements.theta.setAttribute("transform", "rotate(" + thetaAttr + ")");
    }

    start() {
        this.pendulum.knockStick(20);
        var t = this.dt*1000;        
        this.timerToken = setInterval(() => { this.step(); }, t);
        this.timerTokenDisplay = setInterval(() => {this.display(); }, 50);
    }

    stop() {
        clearInterval(this.timerToken);
        clearInterval(this.timerTokenDisplay);
    }
}

window.onload = () => {
    var el1 = document.getElementById('x');
    var el2 = document.getElementById('theta');
    var el3 = document.getElementById('xValue');
    var el4 = document.getElementById('thetaValue');
    var elements = { x: el1, theta: el2, xValue: el3, thetaValue: el4 };
    var simulation = new Simulation(elements);
    simulation.start();
    setTimeout(() => { simulation.stop(); }, 60000);
};