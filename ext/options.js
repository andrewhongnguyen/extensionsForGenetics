// Saves options to chrome.storage
function save_options_and_check() {
    var UserID = document.getElementsByName('UserId').value;
    var password = document.getElementsByName('password').value;

    if(chrome.storage.sync.get(UserID) == null || chrome.storage.sync.get(password)== null) {
        chrome.storage.sync.set({
            UserID: UserID,
            password: password
        }, function () {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }
    else
    {
        if(chrome.storage.sync.get(UserID)==UserID && chrome.storage.sync.get(UserID)==UserID){
            //go to database
        }
        else{
            //print err message
            var status = document.getElementById('status');
            status.textContent = 'Wrong UserID or password';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        }
    }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value " "
    chrome.storage.sync.get({
        UserID: " ",
        password: " "
    }, function(items) {
        document.getElementById('UserID').value = items.UserID;
        document.getElementById('password').value = items.password;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options_and_check);