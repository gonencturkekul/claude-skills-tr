---
skill: verification-before-completion
title: Bitirmeden önce doğrulama
source: skills/verification-before-completion/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Claude'un "bitti", "düzeldi" ya da "testler geçiyor" demeden önce bunu kanıtlamasını şart koşar. Temel kural: o anda çalıştırılmış taze bir doğrulama olmadan tamamlandı iddiası yapılmaz. Her iddia için beş adımlı bir kapı var: iddiayı hangi komutun kanıtladığını belirle, komutu eksiksiz çalıştır, çıktının tamamını oku ve hata sayısına bak, çıktının iddiayı gerçekten destekleyip desteklemediğini kontrol et, ancak sonra iddiayı kanıtıyla birlikte söyle. Linter'ın geçmesi build'in geçtiği anlamına gelmez, bir alt ajanın "başardım" demesi de değişikliğin yapıldığını göstermez, diff'e bakılır. Regresyon testi için testin düzeltme geri alındığında başarısız olduğu da görülmelidir. "Muhtemelen", "olması lazım" gibi ifadeler ve doğrulamadan önce "Harika!" demek tehlike işareti sayılır. Commit, PR ve sonraki göreve geçmeden önce her zaman uygulanır.

## Ne zaman kullanılır
- Bir işi tamamlandı olarak işaretlemeden önce
- Commit atmadan ya da PR açmadan önce
- Bir alt ajanın raporunu kabul etmeden önce
- Bir hatanın gerçekten düzeldiğini söylemeden önce

## Örnek
```
düzelttiğini söylüyorsun, test komutunu çalıştırıp çıktıyı göster
```

## İlgili skill'ler
- `test-driven-development`: Kırmızı-yeşil döngüsüyle kanıt üretir.
- `systematic-debugging`: Düzeltmeyi doğrulamak bu sürecin son adımı.
- `finishing-a-development-branch`: Dalı kapatmadan önce testleri doğrular.
