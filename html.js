({houseName, checkIn, checkOut, total, href}) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #F9FFF6;">

<div style="width: 80%; margin: 0 auto;">
    <div style="border: 2px dashed black; border-radius: 15px; padding: 20px; background-color: #F9FFF6;">
        <div style="display: flex; position: relative; height: 100%; gap: 20px;">
            <img style="max-width: 40%; height: auto; object-fit: cover; border-radius: 15px;" src="https://via.placeholder.com/300x200" alt="Домик в Нормандии"/>
            <div style="position: relative; width: 60%; display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; gap: 5px;">
                    <p style="font-size: 20px; margin: 0;">Домик:</p>
                    <p style="font-size: 20px; margin: 0;">${houseName}</p>
                </div>
                <div style="display: flex; gap: 5px;">
                    <p style="font-size: 20px; margin: 0;">Заезд:</p>
                    <div>
                        <p style="font-size: 20px; margin: 0;">${checkIn}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <p style="font-size: 20px; margin: 0;">Выезд:</p>
                    <div>
                        <p style="font-size: 20px; margin: 0;">${checkOut}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <p style="font-size: 20px; margin: 0;">Стоимость:</p>
                    <p style="font-size: 20px; margin: 0;">${total} ₽</p>
                </div>
            </div>
        </div>
    </div>
    <div style="display: flex; gap: 5px; margin-top: 20px">
        <a style="font-size: 20px; margin: 0; " href="${href}">Ссылка на страницу бронирования</a>
    </div>
</div>
</body>
</html>
`
}