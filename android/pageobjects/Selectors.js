'//*[@resource-id=""]'
'//*[@resource-id="" and (@text="")]'
'//*[@resource-id="" and contains(@text, "")]'

'//*[@class=""]'
'//*[@class="" and (@text="")]'
'//*[@class="" and contains(@text, "")]'

'//*[@resource-id=""]//*[@resource-id=""]'
'//*[@resource-id=""]//*[@resource-id="" and (@text="")]'

await $('//*[@resource-id=""]')
await $('//*[@resource-id="" and (@text="")]')
await $('//*[@resource-id="" and contains(@text, "")]')

await $('//*[@class=""]')
await $('//*[@class="" and (@text="")]')
await $('//*[@class="" and contains(@text, "")]')

await $('//*[@resource-id=""]//*[@resource-id=""]')
await $('//*[@resource-id=""]//*[@resource-id="" and (@text="")]')
