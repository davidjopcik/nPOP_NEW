# Rozbehanie projektu

1. Naklonovanie projektu
##
    git clone https://gitlab.prosoft.sk/swp/npop-e2e-tests.git 
2. Je potrebné mať správne nastavené v systémových premenných ANDROID HOME

3. Testy sa spúšťajú z default priečinka "nPOP_EVOD", preto je potrebné sa do neho prepnúť 
##
    cd nPOP_EVOD/
4. Nainštalovanie potrebných balíčkov z Node package manager.   
##
    npm install
5. Inštalácia appium pluginu 
##
    npm install appium -g
6. Na spustenie testov je potrebné mať pripojené reálne zariadenie(Zebra) s nainštalovanou aplikáciou nPOP alebo emulátor
 
## Spustenie testov:
### 1. Pripojenie reálneho zariadenia(POPky), alebo spustenie emulátora s nainštalovanou aplikáciou nPOP.

### 2. Spustenie appium tool(server) - cez terminál/commandline:   
    appium
### 3. Spustenie základných testov(v novom tabe/termináli):   
    npm run e2e

### More about how tu run tests
https://webdriver.io/docs/organizingsuites

    