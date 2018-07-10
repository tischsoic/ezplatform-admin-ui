(function(Translator) {
    const btns = document.querySelectorAll('.btn--udw-move');
    const form = document.querySelector('form[name="location_move"]');
    const input = form.querySelector('#location_move_new_parent_location');
    const udwContainer = document.getElementById('react-udw');
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const onConfirm = (items) => {
        closeUDW();

        input.value = items[0].id;
        form.submit();
    };
    const canSelectContent = ({ item }, callback) => callback(item.ContentInfo.Content.ContentTypeInfo.isContainer);
    const onCancel = () => closeUDW();
    const openUDW = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const confirmLabel = Translator.trans(/*@Desc("Move to location")*/ 'confirm', {}, 'admin_ui_frontend_udw_move');
        const title = Translator.trans(/*@Desc("Select destination")*/ 'title', {}, 'admin_ui_frontend_udw_move');

        window.ReactDOM.render(
            window.React.createElement(
                window.eZ.modules.UniversalDiscovery,
                Object.assign(
                    {
                        onConfirm,
                        onCancel,
                        canSelectContent,
                        confirmLabel,
                        title,
                        multiple: false,
                        startingLocationId: parseInt(event.currentTarget.dataset.rootLocation, 10),
                        restInfo: { token, siteaccess },
                        allowContainersOnly: true,
                    },
                    config
                )
            ),
            udwContainer
        );
    };

    btns.forEach((btn) => btn.addEventListener('click', openUDW, false));
})(window.Translator);
