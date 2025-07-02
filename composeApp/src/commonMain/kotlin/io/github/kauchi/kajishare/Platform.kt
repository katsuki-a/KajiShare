package io.github.kauchi.kajishare

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform