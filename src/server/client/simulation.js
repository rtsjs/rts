var Cart = (function () {
    function Cart(x, x_p) {
        this.x = x;
        this.x_p = x_p;
    }
    Cart.prototype.integrate = function (t) {
        this.x = this.x + this.x_p * t + this.x_pp * t * t / 2;
        this.x_p = this.x_p + this.x_pp * t;
    };
    return Cart;
})();
var Stick = (function () {
    function Stick(th, th_p) {
        this.th = th;
        this.th_p = th_p;
    }
    Stick.prototype.integrate = function (t) {
        this.th = this.th + this.th_p * t + this.th_pp * t * t / 2;
        this.th_p = this.th_p + this.th_pp * t;
    };
    return Stick;
})();
var Controller = (function () {
    function Controller(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    Controller.prototype.getForce = function (x, th, x_p, th_p) {
        var f = this.a * x + this.b * (th - Math.PI / 2) + this.c * x_p + this.d * th_p;
        return f;
    };
    return Controller;
})();
var Pendulum = (function () {
    function Pendulum(cart, stick) {
        this.cart = cart;
        this.stick = stick;
    }
    Pendulum.prototype.knockStick = function (angle) {
        this.stick.th -= angle * Math.PI / 180;
    };
    Pendulum.prototype.solve = function (f) {
        var th = this.stick.th;
        var th_p = this.stick.th_p;
        var co = Math.cos(th);
        var si = Math.sin(th);
        var x_pp = (co * th_p * th_p - 2 * co * si + 2 * f) / (4 - 2 * si * si);
        var th_pp = -2 * co + 2 * si * x_pp;
        this.cart.x_pp = x_pp;
        this.stick.th_pp = th_pp;
    };
    Pendulum.prototype.integrate = function (t) {
        this.cart.integrate(t);
        this.stick.integrate(t);
    };
    return Pendulum;
})();
var Simulation = (function () {
    function Simulation(elements) {
        this.elements = elements;
        //initialization
        this.dt = 0.01;
        var cart = new Cart(0, 0);
        var stick = new Stick(Math.PI / 2, 0);
        this.controller = new Controller(1, -14.8452, 5.97415, -13.7966);
        this.pendulum = new Pendulum(cart, stick);
    }
    Simulation.prototype.step = function () {
        var f = this.controller.getForce(this.pendulum.cart.x, this.pendulum.stick.th, this.pendulum.cart.x_p, this.pendulum.stick.th_p);
        //f = 0;
        this.pendulum.solve(f);
        this.pendulum.integrate(this.dt);
    };
    Simulation.prototype.display = function () {
        var thetaAttr = (this.pendulum.stick.th * 180 / Math.PI).toString();
        var xAttr = (this.pendulum.cart.x * 100).toString();
        var xVal = (this.pendulum.cart.x).toString();
        this.elements.thetaValue.innerText = thetaAttr;
        this.elements.xValue.innerText = xVal;
        this.elements.x.setAttribute("transform", "translate(" + xAttr + ")");
        this.elements.theta.setAttribute("transform", "rotate(" + thetaAttr + ")");
    };
    Simulation.prototype.start = function () {
        var _this = this;
        this.pendulum.knockStick(20);
        var t = this.dt * 1000;
        this.timerToken = setInterval(function () { _this.step(); }, t);
        this.timerTokenDisplay = setInterval(function () { _this.display(); }, 50);
    };
    Simulation.prototype.stop = function () {
        clearInterval(this.timerToken);
        clearInterval(this.timerTokenDisplay);
    };
    return Simulation;
})();
window.onload = function () {
    var el1 = document.getElementById('x');
    var el2 = document.getElementById('theta');
    var el3 = document.getElementById('xValue');
    var el4 = document.getElementById('thetaValue');
    var elements = { x: el1, theta: el2, xValue: el3, thetaValue: el4 };
    var simulation = new Simulation(elements);
    simulation.start();
    setTimeout(function () { simulation.stop(); }, 60000);
};

//# sourceMappingURL=simulation.js.map
