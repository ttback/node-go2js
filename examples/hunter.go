package main


func main(){
	enemy := this.getNearestEnemy()
	if enemy==nil {
	   return
	}
	this.say("Die, " + enemy.id + "!")
	this.setTarget(enemy)

	a := this.distance(enemy)
	b := this.attackRange

	if a > b {
		this.setAction("move")
	} else {
		this.setAction("attack")
	}
}