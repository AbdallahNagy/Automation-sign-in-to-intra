"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const puppeteer_1 = __importDefault(require("puppeteer"));
const program = new commander_1.Command();
program
    .name('intra')
    .description('automating intra registration')
    .version('1.0.0');
program.command('signin')
    .description('Provide email and password to automatically sign in to intra')
    .option('-e, --email <type>', 'Enter your intra email address') // mandatory
    .option('-p, --password [char]', 'Enter your intra password') // optional
    .action(signInAction);
program.parse();
function signInAction(options) {
    (() => __awaiter(this, void 0, void 0, function* () {
        console.log('d');
        const emailInputSelector = '#txtUser';
        const passwordInputSelector = '#txtPass';
        const loginBtnSelector = '#btnLogin';
        const signInSelector = '.SignInBtn';
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto('https://intra.performly.com/');
        yield page.type(emailInputSelector, options.email);
        yield page.type(passwordInputSelector, options.password);
        yield page.click(loginBtnSelector);
        // wait untill navigating to intra main page
        yield page.waitForNavigation();
        // await page.click(signInSelector)
    }));
}
