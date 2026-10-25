---
skill: agent-workflow-designer
title: Ajan iş akışı tasarımı
source: skills/agent-workflow-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Birkaç adımdan oluşan ajan iş akışlarını üretime uygun şekilde kurmana yardım eder. Beş desen arasından seçim yapar: sıralı zincir, paralel dağıtıp toplama, isteğe göre yönlendiren router, uzmanları koordine eden orchestrator ve üretip kalite kapısından geçiren evaluator döngüsü. Seçilen desen için bir script hazır bir iskelet yapılandırması üretir. Ardından her adım arasında hangi bilginin aktarılacağı bir sözleşmeyle tanımlanır, zaman aşımı ve yeniden deneme kuralları eklenir, ara çıktılar doğrulanır. Skill bağlamın şişmesine ve maliyetin adım adım birikmesine özellikle dikkat eder: tüm geçmişi aktarmak yerine sadece gereken çıktıyı geçirmeyi önerir. Tek bir iyi prompt'un yeteceği işe gereğinden fazla ajan eklemeye karşı da uyarır.

## Ne zaman kullanılır
- Tek bir prompt işin karmaşıklığına yetmediğinde
- Sınırları belli uzman ajanlara ihtiyacın olduğunda
- Mevcut bir LLM akışı bağlam şişmesi ya da güvenilmez aktarımlar yüzünden bozulduğunda
- Uygulamaya geçmeden önce akışın yapısını netleştirmek istediğinde

## Örnek
```
Destek taleplerini sınıflandırıp ilgili uzmana yönlendiren bir ajan akışı kur, router deseniyle
```

## İlgili skill'ler
- `agent-designer`: Daha büyük, çok ajanlı sistemlerde desen seçimi ve log analizi için.
- `agent-regression-evals`: Akışta yaptığın değişikliklerin kaliteyi düşürmediğini ölçmek için.
- `observability-designer`: Çalışan akışı izlemek ve uyarı kurmak için.
