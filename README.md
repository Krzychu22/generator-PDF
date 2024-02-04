# GeneratorPDF

## Uruchamianie 
W terminalu należy wpisać `ng start`

## Dostęp do wynikowego HTML
Cały kod pojawi się z konsoli w momencie kliknięcia `Drukuj HTML`. Należy go skopiować i zapisać na swoim urządzeniu
jako HTML Dokument

## Generowanie
W pliku generator.js należy dodać w 12 lini ustawić website_url z `http://localhost:4200/` na ścieżkę do wygenerowanego i zapisanego wcześniej wynikowego HTML. Następnie uruchomić generator za pomocą `node generator.js`. Dzięki temu można usyskać plik result.pdf ze wcześniej uzupełnionego formularza

plik generator.js korzysta z puppeteer: 21.11.0
