# Hostinger / Shared Hosting deployment

Ye site shared hosting (Hostinger, cPanel, etc.) pe static SPA + PHP contact form ke through chalti hai.

## 1. Build karein

```bash
npm install
npm run build:static
```

> ⚠️ Hostinger ke liye **`npm run build:static`** chalayein — `npm run build` nahi.
> `npm run build` Lovable publish ke liye SSR build banata hai (`dist/client` + `dist/server` dono).
> `npm run build:static` sirf static SPA banata hai aur output `dist/client` mein hota hai.

Build complete hone ke baad `dist/client/` folder banega. **Sirf is folder ke andar wali files** upload karni hain — `dist/client` folder ko khud nahi.

## 2. Hostinger pe upload

1. hPanel → File Manager → `public_html` kholein.
2. `public_html` ke andar **purani files delete** kar dein (agar koi default file ho).
3. `dist/client/` ke andar ki saari files (including `index.html`, `assets/`, `contact.php`, `.htaccess`, `favicon.png`) `public_html` mein upload karein.

> Note: `.htaccess` hidden file hoti hai — File Manager mein "Show Hidden Files" enable rakhein.

## 3. SMTP password verify

`public_html/contact.php` kholein aur `$SMTP_PASS` line mein apna actual Hostinger email password confirm karein:
```php
$SMTP_PASS = 'Haroonraja44@';
```

Hostinger pe agar email account `support@levalt.tech` already bana hua hai aur is hi password se login hota hai, to form chal jayega.

## 4. Test

- `https://levalt.tech/` open karein → home page chalni chahiye.
- `https://levalt.tech/services` direct kholein → 404 nahi ana chahiye (`.htaccess` SPA routes handle karta hai).
- Contact form fill karke submit karein → `support@levalt.tech` pe email ana chahiye.

## Troubleshooting

- **Refresh pe 404**: `.htaccess` upload nahi hua. File Manager mein hidden files dikhayein aur dobara upload karein.
- **Contact form "Failed to send"**: 
  - hPanel → Email Accounts mein dekh lein ke `support@levalt.tech` ka password sahi hai.
  - Hostinger File Manager mein `error_log` file check karein (public_html ke andar) — wahan SMTP error message hota hai.
- **Email spam mein jati hai**: hPanel mein domain ka SPF/DKIM enable kar dein.
