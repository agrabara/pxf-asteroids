input.onButtonPressed(Button.A, function () {
    if (statek.get(LedSpriteProperty.X) > 0) {
        statek.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (statek.get(LedSpriteProperty.X) < 4) {
        statek.change(LedSpriteProperty.X, 1)
    }
})
input.onButtonPressed(Button.AB, function () {
    // strzelamy
    // laser tworzy się tam gdzie nasz statek
    laser = game.createSprite(statek.get(LedSpriteProperty.X), statek.get(LedSpriteProperty.Y))
    laser.set(LedSpriteProperty.Brightness, 100)
    // póki laser nie doleci do górnej krawędzi
    while (laser.get(LedSpriteProperty.Y) > 0) {
        // ruch lasera w górę
        laser.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
        // czy dopadliśmy kosmitę
        if (laser.isTouching(kosmita)) {
            game.addScore(1)
            // kosmita pojawia się znów na górze
            kosmita.set(LedSpriteProperty.Y, 0)
            // ale w losowej pozycji X
            kosmita.set(LedSpriteProperty.X, Math.randomRange(0, 4))
            if (game.score() % 3 == 0 && pauza > 100) {
                pauza += -100
            }
        }
    }
    // jak laser doleci do samej góry - znika
    laser.delete()
})

/**
 * Gra z trzecich zajęć CoderDojo-Micto:bit zdalnie 2020.04.25 obecni: Michalina, Maks, Rafał, Michał
 * 
 * Asteroids
 * 
 * 1. sterowanie statkiem A/B - lewo/prawo 
 * 2. A+B - wystrzelenie pocisku laserowego, który zabija kosmitę
 * 3. kosmita porusza się lewo - prawo
 * 4. kosmita po osiągnięciu prawej krawędzi pojawia się piętro niżej
 * 5. losowo kosmita zrzuca bombę, przed którą trzeba uciekać - nie da się jej zestrzelić
 * 5. co 3 zestrzelonych kosmitów  (reszta z dzielenia), prędkość kosmity przyspiesza ;-) aby było trudniej 
 * 5. liczymy ile razy udało się zestrzelić kosmitów
 * 
*/
let bomba: game.LedSprite = null
let laser: game.LedSprite = null
let kosmita: game.LedSprite = null
let statek: game.LedSprite = null
let pauza = 0
statek = game.createSprite(2, 4) //nasz statek na dole planszy
kosmita = game.createSprite(0, 0) // kosmita w lewym górnym rogu
pauza = 1000
basic.showString("Asteroids")
basic.forever(function () {
    // ruch kosmity
    if (kosmita.get(LedSpriteProperty.X) == 4) {
        kosmita.set(LedSpriteProperty.X, 0)
        if (kosmita.get(LedSpriteProperty.Y) == 4) {
            kosmita.set(LedSpriteProperty.Y, 0)
        } else {
            kosmita.change(LedSpriteProperty.Y, 1)
        }
    } else {
        kosmita.change(LedSpriteProperty.X, 1)
    }
    basic.pause(pauza)
    // jeśli kosmita nas dopadł
    if (statek.isTouching(kosmita)) {
        game.gameOver()
    }
    // nowa rzecz - sprawdzamy czy NIE istnieje bomba (bomba == null)
    // i jeśli nie istnieje losujemy czy ma się pojawić bomba
    if (bomba == null && Math.randomRange(0, 5) == 0) {
        bomba = game.createSprite(kosmita.get(LedSpriteProperty.X), kosmita.get(LedSpriteProperty.Y))
        bomba.set(LedSpriteProperty.Blink, 10)
    }
    // jeśli istnieje bomba (bomba != null) sprawdzamy czy nas uderzyła
    if (bomba != null && statek.isTouching(bomba)) {
        game.gameOver()
    }

    // jeśli istnieje bomba (bomba != null)
    if (bomba != null) {
        //ruch bomby w dół
        if (bomba.get(LedSpriteProperty.Y) == 4) {
            // jak spadła na sam dół - kasujemy ją 
            // bomba będzie teraz = null
            // to właśnie robi funkcja delete()
            bomba.delete()
        } else {
            bomba.change(LedSpriteProperty.Y, 1)
        }
    }
})
