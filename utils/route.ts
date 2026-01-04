const routes: Record<string, string> = {
    'login': '/login',
    'register': '/register',

    // Auth routes
    'home': '/user/home',
    'shopping-list': '/user/shopping-list',
    'meal-plans': '/user/meal-plans',
    'settings': '/user/settings'
}

export default function route(name: string) {
    return routes[name];
}