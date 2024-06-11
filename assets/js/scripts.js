const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * Hàm tải template
 *
 * Cách dùng:
 * <div id="parent"></div>
 * <script>
 *  load("#parent", "./path-to-template.html");
 * </script>
 */
function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        $(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                $(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();

            if (!$(target)) {
                return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

window.addEventListener("template-loaded", () => {
    const tabsSelector = "news-tab__item";
    const contentsSelector = "news-tab__content";

    const tabActive = `${tabsSelector}--current`;
    const contentActive = `${contentsSelector}--current`;

    const tabContainers = $$(".js-tabs");
    tabContainers.forEach((tabContainer) => {
        const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
        const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
        tabs.forEach((tab, index) => {
            tab.onclick = () => {
                tabContainer.querySelector(`.${tabActive}`)?.classList.remove(tabActive);
                tabContainer.querySelector(`.${contentActive}`)?.classList.remove(contentActive);
                tab.classList.add(tabActive);
                contents[index].classList.add(contentActive);
            };
        });
    });
});

// window.addEventListener("template-loaded", () => {
//     const peopleList = document.querySelector(".people__list");
//     const peopleItems = document.querySelectorAll(".people-item");
//     const prevSliderButton = document.querySelector(".people__ctrl-btn--prev");
//     const nextSliderButton = document.querySelector(".people__ctrl-btn--next");
//     const peopleItemWidth = peopleItems[0].offsetWidth;
//     const totalPeopleItems = peopleItems.length;
//     let currentIndex = 0;

//     const showItem = (itemList, currentIndex, itemWidth) => {
//         itemList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
//     };

//     prevSliderButton.onclick = () => {
//         currentIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : totalPeopleItems - 1;
//         showItem(peopleList, currentIndex, peopleItemWidth);
//     };

//     nextSliderButton.onclick = () => {
//         currentIndex = currentIndex + 1 < totalPeopleItems ? currentIndex + 1 : 0;
//         showItem(peopleList, currentIndex, peopleItemWidth);
//     };

//     showItem(peopleList, currentIndex, peopleItemWidth);
// });

window.addEventListener("template-loaded", () => {
    const peopleList = document.querySelector(".people__list");
    const peopleItems = document.querySelectorAll(".people-item");
    const prevSliderButton = document.querySelector(".people__ctrl-btn--prev");
    const nextSliderButton = document.querySelector(".people__ctrl-btn--next");
    const peopleItemWidth = peopleItems[0].offsetWidth;
    const totalPeopleItems = peopleItems.length;
    let currentIndex = 0;

    const showItem = (itemList, currentIndex, itemWidth) => {
        itemList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    prevSliderButton.onclick = () => {
        currentIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : totalPeopleItems - 1;
        showItem(peopleList, currentIndex, peopleItemWidth);
    };

    nextSliderButton.onclick = () => {
        currentIndex = currentIndex + 1 < totalPeopleItems ? currentIndex + 1 : 0;
        showItem(peopleList, currentIndex, peopleItemWidth);
    };

    const autoSlide = () => {
        currentIndex = currentIndex + 1 < totalPeopleItems ? currentIndex + 1 : 0;
        showItem(peopleList, currentIndex, peopleItemWidth);
    };

    // Bắt đầu tự động chuyển slide sau 4 giây
    let autoSlideInterval = setInterval(autoSlide, 4000);

    // Dừng tự động chuyển slide khi người dùng nhấp vào nút điều khiển
    prevSliderButton.addEventListener("click", () => clearInterval(autoSlideInterval));
    nextSliderButton.addEventListener("click", () => clearInterval(autoSlideInterval));

    // Khởi tạo slide ban đầu
    showItem(peopleList, currentIndex, peopleItemWidth);
});

window.addEventListener("DOMContentLoaded", () => {
    const nextAuthContentBtn = $(".auth__intro-next-btn");
    const authContent = $("#auth-content");

    nextAuthContentBtn.addEventListener("click", () => {
        if (authContent.classList.contains("hide")) {
            authContent.classList.remove("hide");
            authContent.classList.add("show");
        } else {
            authContent.classList.remove("show");
            authContent.classList.add("hide");
        }
    });
});
