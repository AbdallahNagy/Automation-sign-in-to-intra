import signInOptions from './signInOptions';

import { Command } from 'commander';
import puppeteer from 'puppeteer';

const program = new Command();

program
    .name('intra')
    .description('automating intra registration')
    .version('1.0.0')

program.command('signin')
    .description('Provide email and password to automatically sign in to intra')
    .option('-e, --email <type>', 'Enter your intra email address') // mandatory
    .option('-p, --password [char]', 'Enter your intra password') // optional
    .action(signInAction)

program.parse();
    
function signInAction(options: signInOptions): void {
    (async () => {
        const emailInputSelector = '#txtUser'
        const passwordInputSelector = '#txtPass'
        const loginBtnSelector = '#btnLogin'
        const signInSelector = '.SignInBtn'

        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage();
        
        await page.goto('https://intra.performly.com/');

        await page.type(emailInputSelector, options.email)
        await page.type(passwordInputSelector, options.password)
        await page.click(loginBtnSelector)

        // wait untill navigating to intra main page
        await page.waitForNavigation();


        // await page.click(signInSelector)
    })
}
