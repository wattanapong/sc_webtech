const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.get('http://localhost:3000/member/login.html');

    await driver.sleep(3000);
    await driver.findElement(By.id('username')).sendKeys('test');
    await driver.sleep(3000);
    await driver.findElement(By.id('password')).sendKeys('1234', Key.ENTER);
    await driver.wait(until.titleIs('ABC'), 3000);
    
    
  } finally {
    await driver.quit();
  }
})();


