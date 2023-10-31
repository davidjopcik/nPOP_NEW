import { progressBarRetryTimeout } from "../../constant.config" 

class BasicFunctions {
    get closeBtnSelector() {
        return $('~Prejsť nahor')
    }
    get confirmButtonSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_confirm"]')
    }
    get confirmBtnSelector() {
        return $('//*[@text="POTVRDIŤ"]')
    }
    get yesBtnSelector() {
        return $('//*[@text="ÁNO"]')
    }
    get OkButtonSelector() {
        return $('//*[@text="OK"]')
    }
    get zapisatSelector() {
        return $('//*[@text="ZAPÍSAŤ"]')
    }
    get zrusitSelector() {
        return $('//*[@text="ZRUŠIŤ"]')
    }
    get progressBar() {
        return $('//*[@class="android.widget.ProgressBar"]')
    }
    get backSelector() {
        return $('~Prejsť nahor')
    }


    async findSelector(selector) {
        await $('//*[@text="'+selector+'"]')
    }

    async clickOnSelector(selector) {
        (await $('//*[@text="'+selector+'"]')).click()
    }

    async closeBtn() {
        await this.closeBtnSelector.waitForDisplayed()
        await this.closeBtnSelector.click()
    }

    async confirmBtnClick() {
        await this.confirmBtnSelector.click()
    }

    async backBtnClick() {
        await this.backSelector.waitForDisplayed()
        await this.backSelector.click()
    }

    async waitForProgressBar() {
        let timeout = false
        setTimeout(async function () {
            timeout = true
        }, progressBarRetryTimeout);
        while (await this.progressBar.isDisplayed()) {
            await browser.pause()
            if (timeout) {
                throw new Error("ProgressBar over " + progressBarRetryTimeout + "")
            }
        }
    }

}
export default new BasicFunctions