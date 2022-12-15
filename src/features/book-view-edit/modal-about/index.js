import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {ModalEdit} from "/src/features/book-view-edit/modal-edit";
import {layout} from "./ui";


const open = async (bookId, onDelete, onFavoriteToggle) => {
    try {
        const bookInfo = await Api.getBook(bookId);
        const domParser = new DOMParser();
        const htmlTemplate = domParser.parseFromString(layout(bookInfo), "text/html");

        const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);
        const btnAboutModalClose = document.getElementById("modal-order-close-btn");
        btnAboutModalClose.onclick = () => {
            modalWindow.remove();
        };

        const btnTrash = document.getElementById("btn-trash");
        btnTrash.onclick = () => {
            btnAboutModalClose.click();
            onDelete(bookInfo);
        };

        const btnFavorite = document.getElementById("btn-favorite");
        btnFavorite.onclick = async () => {
            if (await onFavoriteToggle(bookInfo)) {
                bookInfo.isFavorite = !bookInfo.isFavorite;
                const btnFavoriteIcon = document.getElementById("modal-about-btn-favorite-icon");
                btnFavoriteIcon.setAttribute("fill", bookInfo.isFavorite ? "red" : "gray");
            }
        };


        const btnEdit = document.getElementById("modal-about-btn-edit");
        btnEdit.onclick = () => {
            window.removeEventListener("keydown", onKeyDown);
            ModalEdit.open(
                bookInfo,
                () => window.addEventListener("keydown", onKeyDown),
                async () => {
                    if (await onDelete(bookInfo)) {
                        btnAboutModalClose.click();
                        return true;
                    }
                }
            );
        };


        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                btnAboutModalClose.click();
                window.removeEventListener("keydown", onKeyDown);
            }
        };

        window.addEventListener("keydown", onKeyDown);

    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalAbout = {
    open
};