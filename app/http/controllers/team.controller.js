const autoBind = require("auto-bind");
const {TeamModel} = require("./../../models/team");
const {lanquage} = require("../../locales/fa");

class TeamController {
    constructor() {
        autoBind(this);
    }
    async createTeam(req, res, next) {
        try {
            const {name, username, description} = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({name, description, username, owner}).catch(err => {
                console.log(err);
                if (err?.code == 11000) throw {status: 400, message: lanquage.team.DontCreate};
            });
            if (!team) throw {status: 500, message: lanquage.team.WrongCreateTeam};
            return res.status(201).json({status: 201, success: true, message: lanquage.team.SuccessCreateTeam});
        } catch (error) {
            next(error);
        }
    }
    async getAllTeam(req, res, next) {
        try {
            const teams = await TeamModel.find({});
            return res.status(200).json({status: 200, success: true, teams});
        } catch (error) {
            next(error);
        }
    }
    async getTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if (!team) throw {status: 404, message: lanquage.team.NotFoundTeam};
            return res.status(200).json({status: 200, success: true, team});
        } catch (error) {
            next(error);
        }
    }
    async getMyTeams(req, res, next) {
        // const Team = await TeamModel.find({$or: [{owner: userID}, {users: userID}]});
        try {
            const userID = req.user._id;
            const teams = await TeamModel.aggregate([
                {
                    $match: {$or: [{owner: userID}, {users: userID}]},
                },
                {
                    $lookup: {from: "users", localField: "owner", foreignField: "_id", as: "owner"},
                },
                {
                    $project: {"owner.roles": 0, "owner.password": 0, "owner.token": 0, "owner.teams": 0, "owner.skills": 0, "owner.inviteRequests": 0},
                },
                {
                    $unwind: "$owner",
                },
            ]);
            return res.status(200).json({status: 200, success: true, teams});
        } catch (error) {
            next(error);
        }
    }
    async removeTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if (!team) throw {status: 404, message: lanquage.team.NotFoundTeam};
            const result = await TeamModel.deleteOne({_id: teamID});
            if (result.deletedCount == 0) throw {status: 500, message: lanquage.team.WrongDelete};
            return res.status(200).json({status: 200, success: true, message: lanquage.team.SuccessDelete});
        } catch (error) {
            next(error);
        }
    }
    async updateTeam(req, res, next) {
        try {
            const data = {...req.body};
            const userID = req.user._id;
            const {teamID} = req.params;
            const team = await TeamModel.findOne({owner: userID, _id: teamID});
            Object.keys(data).forEach(key => {
                if (!data[key]) delete data[key];
                if (["", " ", undefined, null, NaN].includes(data[key])) delete data[key];
            });
            if (!team) throw {status: 404, message: lanquage.team.NotFoundTeam};
            const teamEditResult = await TeamModel.updateOne({_id: teamID}, {$set: data});
            if (teamEditResult.modifiedCount == 0) throw {status: 500, message: lanquage.team.WrongUpdate};
            return res.status(200).json({status: 200, success: true, message: lanquage.team.SuccessUpdate});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    TeamController: new TeamController(),
};
