---
skill: mcp-server-builder
title: OpenAPI'den MCP sunucusu kurma
source: skills/mcp-server-builder/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir API'yi LLM agent'larına açmak için MCP sunucusu tasarlar. Tool'ları tek tek elle sarmak yerine OpenAPI sözleşmesini doğruluk kaynağı olarak alır. `openapi_to_mcp.py` betiği OpenAPI path'lerini MCP tool tanımlarına çevirir ve Python ya da TypeScript için başlangıç sunucu kodu üretir. `mcp_validator.py` tool manifestini tekrarlanan isimler, bozuk şema, eksik açıklama ve isimlendirme sorunları için denetler; strict modda hata varsa sıfır olmayan çıkış koduyla döner. Hangi durumda Python, hangisinde TypeScript seçileceğini anlatır. Yayın öncesi kuralları da net: secret'lar şemada değil ortam değişkenlerinde durur, açık proxy yerine izinli host listesi kullanılır, tool isimleri yerinde değiştirilmez, değişiklikler sadece ekleme yönünde yapılır.

## Ne zaman kullanılır
- İç ya da dış bir REST API'yi Claude gibi bir agent'a açmak istediğinde
- Kırılgan tarayıcı otomasyonunu tipli tool'larla değiştirmek için
- Birçok ekibin ortak kullanacağı tek bir MCP sunucusu kuracaksan
- MCP tool'larını yayınlamadan önce tekrarlanabilir kalite kontrolü için

## Örnek
```
openapi.json dosyamdan TypeScript ile billing-mcp adında bir MCP sunucusu iskeleti üret
```

## İlgili skill'ler
- `api-design-reviewer`: Kaynak OpenAPI sözleşmesini önce gözden geçirmek için.
- `api-test-suite-builder`: Sunucunun dayandığı API için test üretmek için.
- `agent-designer`: Bu tool'ları kullanacak agent mimarisini tasarlamak için.
