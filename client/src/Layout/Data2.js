async function getMenuData() {
    return new Promise((resolve) => {
        // Retrieve data from localStorage
        var User = JSON.parse(localStorage.getItem("userDetail"));
        let userRole = User?.Role?.title;


        let OurData = [];

        if (userRole === "superAdmin") {
            OurData = [
                { name: "Users", link: "/admindashboard/users" },
                { name: "Subscribers", link: "/admindashboard/subscribers" },
                { name: "KPIs", link: "/admindashboard/addKPis" },
                { name: "Scenario Goals", link: "/admindashboard/scenariogoals" },
                 { name: "Companies List", link: "/admindashboard/companyuser" },
                // { name: "Scenario Planning", link: "/admindashboard/scenarioplannings" },
                // { name: "payment", link: "/admindashboard/payments" },       
                { name: "Queries", link: "/admindashboard/queries" }, 
                  { name: "Settings", link: "/admindashboard/adminSetting" },
            ];
        } else if (userRole === "user") {
            OurData = [
                { name: "Settings", link: "/admindashboard/adminSetting" },
                // { name: "payment", link: "/admindashboard/payments" },
                { name: "CFO List", link: "/admindashboard/cfolist" },
            ];
        } 
        else if (userRole === "admin") {
            OurData = [
                { name: "Team Members", link: "/companyDashboard/Team-Members" },
                // { name: "payment", link: "/companyDashboard/payments" },
                { name: "Settings", link: "/companyDashboard/settings" },
            ];
        }

        resolve(OurData);
    });
}

export { getMenuData };
