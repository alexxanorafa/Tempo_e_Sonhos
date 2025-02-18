    // ============ SISTEMA DE MENU ============
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });
    // Exemplo de animação de relógio com SVG
    animateClock("left-clock", true);
    animateClock("right-clock", false);

    // Rola automaticamente para a hora atual
    scrollToCurrentHour();

    // Atualiza o relógio digital
    updateDigitalClock();

    function animateClock(clockId, highlightCurrentHour) {
      const clock = document.getElementById(clockId);
      const circle = clock.querySelector('circle');
      const hourHand = clock.querySelector('.hour-hand');
      const minuteHand = clock.querySelector('.minute-hand');
      const radius = parseFloat(circle.getAttribute('r'));
      const centerX = parseFloat(circle.getAttribute('cx'));
      const centerY = parseFloat(circle.getAttribute('cy'));

      const currentDate = new Date();
      const hours = currentDate.getHours() % 12; // Garante que estamos no formato de 12 horas
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      const hourAngle = (360 / 12) * (hours + minutes / 60); // Ângulo para a hora
      const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60); // Ângulo para os minutos

      // Adicione uma distorção surreal aos ponteiros
      const distortedHourAngle = hourAngle + Math.sin(seconds * (Math.PI / 30)) * 10;
      const distortedMinuteAngle = minuteAngle + Math.cos(seconds * (Math.PI / 30)) * 5;

      // Aplica a transformação de rotação aos ponteiros
      hourHand.setAttribute('transform', `rotate(${distortedHourAngle} ${centerX} ${centerY})`);
      minuteHand.setAttribute('transform', `rotate(${distortedMinuteAngle} ${centerX} ${centerY})`);

      // Adiciona destaque à hora atual, se necessário
      if (highlightCurrentHour) {
        const currentHourElement = document.getElementById(`${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
        if (currentHourElement) {
          currentHourElement.classList.add('current-hour');
        }
      }

      // Chama a função novamente a cada segundo
      setTimeout(() => animateClock(clockId, highlightCurrentHour), 1000);
    }

function scrollToCurrentHour() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHour}:${currentMinute}`;

    let currentHourElement = document.getElementById(currentTime);

    if (currentHourElement) {
        currentHourElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Se a hora exata não existir, procurar o intervalo mais próximo
        const timeElements = document.querySelectorAll('[id]'); // Pega todos os elementos com ID
        let closestElement = null;
        let closestTimeDiff = Infinity;

        timeElements.forEach(element => {
            const elementTime = element.id;
            const [elementHour, elementMinute] = elementTime.split(':').map(Number);
            const elementTotalMinutes = elementHour * 60 + elementMinute;
            const currentTotalMinutes = parseInt(currentHour) * 60 + parseInt(currentMinute);

            const diff = Math.abs(currentTotalMinutes - elementTotalMinutes);

            if (diff < closestTimeDiff) {
                closestTimeDiff = diff;
                closestElement = element;
            }
        });

        if (closestElement) {
            closestElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

    function updateDigitalClock() {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const digitalClock = document.getElementById('digital-clock');
      digitalClock.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      // Atualiza o relógio digital a cada minuto
      setTimeout(updateDigitalClock, 60000);
    }
        // Função para rolar até o topo
        function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Rolagem suave
      });
    }

    // Adicionando o evento de clique aos relógios laterais
    document.getElementById('left-bar').addEventListener('click', scrollToTop);
    document.getElementById('right-bar').addEventListener('click', scrollToTop);